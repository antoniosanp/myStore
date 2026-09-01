package com.myStore.backend.service.manufacturer;

import com.myStore.backend.dto.manufacturer.ManufacturerRequestDTO;
import com.myStore.backend.dto.manufacturer.ManufacturerResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ManufacturerService {

    ManufacturerResponseDTO createManufacturer(ManufacturerRequestDTO dto);

    ManufacturerResponseDTO getManufacturerById(UUID id);

    List<ManufacturerResponseDTO> getAllManufacturers();

    ManufacturerResponseDTO updateManufacturer(UUID id, ManufacturerRequestDTO dto);

    void deleteManufacturer(UUID id);
}
