package com.myStore.backend.service.auth.impl;

import com.myStore.backend.dto.auth.AuthResponseDTO;
import com.myStore.backend.dto.auth.LoginRequestDTO;
import com.myStore.backend.dto.auth.RegisterRequestDTO;
import com.myStore.backend.exception.DuplicateResourceException;
import com.myStore.backend.model.RefreshToken;
import com.myStore.backend.model.User;
import com.myStore.backend.model.enums.RoleEnum;
import com.myStore.backend.repository.UserRepository;
import com.myStore.backend.security.JwtUtils;
import com.myStore.backend.service.auth.AuthService;
import com.myStore.backend.service.auth.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    @Override
    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new DuplicateResourceException("Email is already in use: " + dto.email());
        }

        User user = User.builder()
                .email(dto.email())
                .password(passwordEncoder.encode(dto.password()))
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .role(RoleEnum.ROLE_USER)
                .isEnabled(true)
                .build();

        User savedUser = userRepository.save(user);

        String token = jwtUtils.generateTokenFromUsername(savedUser.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(savedUser);

        return new AuthResponseDTO(
                token,
                refreshToken.getToken(),
                "Bearer",
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    @Override
    @Transactional
    public AuthResponseDTO login(LoginRequestDTO dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.password())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.generateJwtToken(authentication);
        User user = (User) authentication.getPrincipal();

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        return new AuthResponseDTO(
                token,
                refreshToken.getToken(),
                "Bearer",
                user.getEmail(),
                user.getRole()
        );
    }
}

