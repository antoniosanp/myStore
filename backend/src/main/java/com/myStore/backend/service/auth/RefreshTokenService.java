package com.myStore.backend.service.auth;

import com.myStore.backend.dto.auth.RefreshTokenRequestDTO;
import com.myStore.backend.dto.auth.RefreshTokenResponseDTO;
import com.myStore.backend.model.RefreshToken;
import com.myStore.backend.model.User;

import java.util.Optional;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(User user);

    Optional<RefreshToken> findByToken(String token);

    RefreshToken verifyExpiration(RefreshToken token);

    RefreshTokenResponseDTO refreshAccessToken(RefreshTokenRequestDTO dto);

    int revokeAllByUser(User user);
}
