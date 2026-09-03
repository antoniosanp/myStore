package com.myStore.backend.dto.auth;

public record RefreshTokenResponseDTO(
        String accessToken,
        String refreshToken,
        String tokenType
) {
    public RefreshTokenResponseDTO(String accessToken, String refreshToken) {
        this(accessToken, refreshToken, "Bearer");
    }
}
