package com.myStore.backend.dto.auth;

import com.myStore.backend.model.enums.RoleEnum;

public record AuthResponseDTO(
        String accessToken,
        String refreshToken,
        String tokenType,
        String email,
        RoleEnum role
) {
}
