package com.myStore.backend.controller.manufacturer;

import com.myStore.backend.dto.manufacturer.ManufacturerRequestDTO;
import com.myStore.backend.dto.manufacturer.ManufacturerResponseDTO;
import com.myStore.backend.service.manufacturer.ManufacturerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/manufacturers")
@RequiredArgsConstructor
@Tag(name = "Manufacturers", description = "Endpoints for managing manufacturers")
public class ManufacturerController {

    private final ManufacturerService manufacturerService;

    @PostMapping
    @Operation(summary = "Create a new manufacturer", description = "Creates a new manufacturer with a unique name.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Manufacturer created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request payload"),
            @ApiResponse(responseCode = "409", description = "Manufacturer with this name already exists")
    })
    public ResponseEntity<ManufacturerResponseDTO> createManufacturer(@Valid @RequestBody ManufacturerRequestDTO dto) {
        ManufacturerResponseDTO response = manufacturerService.createManufacturer(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get manufacturer by ID", description = "Retrieves details of a manufacturer by its unique ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Manufacturer found"),
            @ApiResponse(responseCode = "404", description = "Manufacturer not found")
    })
    public ResponseEntity<ManufacturerResponseDTO> getManufacturerById(@PathVariable UUID id) {
        ManufacturerResponseDTO response = manufacturerService.getManufacturerById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "Get all manufacturers", description = "Retrieves details of all manufacturers.")
    @ApiResponse(responseCode = "200", description = "Manufacturers retrieved successfully")
    public ResponseEntity<List<ManufacturerResponseDTO>> getAllManufacturers() {
        List<ManufacturerResponseDTO> response = manufacturerService.getAllManufacturers();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing manufacturer", description = "Updates manufacturer details by ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Manufacturer updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request payload"),
            @ApiResponse(responseCode = "404", description = "Manufacturer not found"),
            @ApiResponse(responseCode = "409", description = "Manufacturer name already exists")
    })
    public ResponseEntity<ManufacturerResponseDTO> updateManufacturer(
            @PathVariable UUID id,
            @Valid @RequestBody ManufacturerRequestDTO dto
    ) {
        ManufacturerResponseDTO response = manufacturerService.updateManufacturer(id, dto);
        return ResponseEntity.ok(response);
    }
}
