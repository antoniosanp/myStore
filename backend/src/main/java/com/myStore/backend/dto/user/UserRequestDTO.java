package com.myStore.backend.dto.user;

import jakarta.validation.constraints.Size;

public record UserRequestDTO(
        @Size(max = 80, message = "First name must not exceed 80 characters")
        String firstName,

        @Size(max = 80, message = "Last name must not exceed 80 characters")
        String lastName
) {
}
