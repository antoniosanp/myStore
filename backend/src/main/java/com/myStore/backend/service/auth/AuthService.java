package com.myStore.backend.service.auth;

import com.myStore.backend.dto.auth.AuthResponseDTO;
import com.myStore.backend.dto.auth.LoginRequestDTO;
import com.myStore.backend.dto.auth.RegisterRequestDTO;

public interface AuthService {

    AuthResponseDTO register(RegisterRequestDTO dto);

    AuthResponseDTO login(LoginRequestDTO dto);
}
