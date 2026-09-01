package com.myStore.backend.service.manufacturer.impl;

import com.myStore.backend.dto.manufacturer.ManufacturerRequestDTO;
import com.myStore.backend.dto.manufacturer.ManufacturerResponseDTO;
import com.myStore.backend.exception.DuplicateResourceException;
import com.myStore.backend.exception.ResourceNotFoundException;
import com.myStore.backend.model.Manufacturer;
import com.myStore.backend.repository.ManufacturerRepository;
import com.myStore.backend.service.manufacturer.ManufacturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ManufacturerServiceImpl implements ManufacturerService {

    private final ManufacturerRepository manufacturerRepository;

    @Override
    @Transactional
    public ManufacturerResponseDTO createManufacturer(ManufacturerRequestDTO dto) {
        if (manufacturerRepository.existsByNameIgnoreCase(dto.name())) {
            throw new DuplicateResourceException("Manufacturer with name '" + dto.name() + "' already exists");
        }

        Manufacturer manufacturer = Manufacturer.builder()
                .name(dto.name())
                .description(dto.description())
                .websiteUrl(dto.websiteUrl())
                .build();

        Manufacturer savedManufacturer = manufacturerRepository.save(manufacturer);
        return mapToResponseDTO(savedManufacturer);
    }

    @Override
    @Transactional(readOnly = true)
    public ManufacturerResponseDTO getManufacturerById(UUID id) {
        Manufacturer manufacturer = manufacturerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with ID: " + id));
        return mapToResponseDTO(manufacturer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ManufacturerResponseDTO> getAllManufacturers() {
        return manufacturerRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    @Transactional
    public ManufacturerResponseDTO updateManufacturer(UUID id, ManufacturerRequestDTO dto) {
        Manufacturer manufacturer = manufacturerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with ID: " + id));

        if (!manufacturer.getName().equalsIgnoreCase(dto.name()) &&
                manufacturerRepository.existsByNameIgnoreCase(dto.name())) {
            throw new DuplicateResourceException("Manufacturer with name '" + dto.name() + "' already exists");
        }

        manufacturer.setName(dto.name());
        manufacturer.setDescription(dto.description());
        manufacturer.setWebsiteUrl(dto.websiteUrl());

        Manufacturer updatedManufacturer = manufacturerRepository.save(manufacturer);
        return mapToResponseDTO(updatedManufacturer);
    }

    @Override
    @Transactional
    public void deleteManufacturer(UUID id) {
        if (!manufacturerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Manufacturer not found with ID: " + id);
        }
        manufacturerRepository.deleteById(id);
    }

    private ManufacturerResponseDTO mapToResponseDTO(Manufacturer manufacturer) {
        return new ManufacturerResponseDTO(
                manufacturer.getId(),
                manufacturer.getName(),
                manufacturer.getDescription(),
                manufacturer.getWebsiteUrl()
        );
    }
}
