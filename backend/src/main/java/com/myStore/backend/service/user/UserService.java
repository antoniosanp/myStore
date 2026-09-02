package com.myStore.backend.service.user;

import com.myStore.backend.dto.user.UserRequestDTO;
import com.myStore.backend.dto.user.UserResponseDTO;

import java.util.List;
import java.util.UUID;

public interface UserService {

    UserResponseDTO getUserById(UUID id);

    UserResponseDTO getUserByEmail(String email);

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO updateUser(UUID id, UserRequestDTO dto);

    void softDeleteUser(UUID id);
}
