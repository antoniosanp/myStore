package com.myStore.backend.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(
        @Schema(description = "User email address", example = "newuser@mystore.example.com")
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        @Size(max = 150, message = "Email must not exceed 150 characters")
        String email,

        @Schema(description = "Account password (min 6 chars)", example = "password123")
        @NotBlank(message = "Password is required")
        @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
        String password,

        @Schema(description = "User first name", example = "Carlos")
        @Size(max = 80, message = "First name must not exceed 80 characters")
        String firstName,

        @Schema(description = "User last name", example = "Gómez")
        @Size(max = 80, message = "Last name must not exceed 80 characters")
        String lastName
) {
}
