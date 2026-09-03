package com.myStore.backend.service.auth.impl;

import com.myStore.backend.dto.auth.RefreshTokenRequestDTO;
import com.myStore.backend.dto.auth.RefreshTokenResponseDTO;
import com.myStore.backend.exception.BadRequestException;
import com.myStore.backend.model.RefreshToken;
import com.myStore.backend.model.User;
import com.myStore.backend.repository.RefreshTokenRepository;
import com.myStore.backend.security.JwtUtils;
import com.myStore.backend.service.auth.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${app.jwt.refresh-expiration-ms:604800000}")
    private Long refreshExpirationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtils jwtUtils;

    @Override
    @Transactional
    public RefreshToken createRefreshToken(User user) {
        refreshTokenRepository.revokeAllByUser(user);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshExpirationMs))
                .revoked(false)
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    @Transactional
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.isRevoked()) {
            throw new BadRequestException("Refresh token has been revoked");
        }

        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new BadRequestException("Refresh token was expired. Please make a new login request");
        }

        return token;
    }

    @Override
    @Transactional
    public RefreshTokenResponseDTO refreshAccessToken(RefreshTokenRequestDTO dto) {
        return findByToken(dto.refreshToken())
                .map(this::verifyExpiration)
                .map(token -> {
                    User user = token.getUser();
                    String newAccessToken = jwtUtils.generateTokenFromUsername(user.getEmail());
                    return new RefreshTokenResponseDTO(newAccessToken, token.getToken());
                })
                .orElseThrow(() -> new BadRequestException("Refresh token not found"));
    }

    @Override
    @Transactional
    public int revokeAllByUser(User user) {
        return refreshTokenRepository.revokeAllByUser(user);
    }
}
