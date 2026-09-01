package com.myStore.backend.dto.user;

import com.myStore.backend.model.enums.RoleEnum;

import java.time.Instant;
import java.util.UUID;

public record UserResponseDTO(
        UUID id,
        String email,
        String firstName,
        String lastName,
        RoleEnum role,
        Boolean isEnabled,
        Instant createdAt
) {
}
