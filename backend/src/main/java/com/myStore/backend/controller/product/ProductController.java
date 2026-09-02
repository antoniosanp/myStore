package com.myStore.backend.controller.product;

import com.myStore.backend.dto.product.ProductRequestDTO;
import com.myStore.backend.dto.product.ProductSummaryDTO;
import com.myStore.backend.service.product.ProductService;
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
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Endpoints for managing products")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @Operation(summary = "Create a new product", description = "Creates a new product with associated manufacturer and categories.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request payload"),
            @ApiResponse(responseCode = "404", description = "Manufacturer or Category not found"),
            @ApiResponse(responseCode = "409", description = "Product with this SKU already exists")
    })
    public ResponseEntity<ProductSummaryDTO> createProduct(@Valid @RequestBody ProductRequestDTO dto) {
        ProductSummaryDTO response = productService.createProduct(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID", description = "Retrieves details of a product by its unique ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<ProductSummaryDTO> getProductById(@PathVariable UUID id) {
        ProductSummaryDTO response = productService.getProductById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/sku/{sku}")
    @Operation(summary = "Get product by SKU", description = "Retrieves details of a product by its SKU.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<ProductSummaryDTO> getProductBySku(@PathVariable String sku) {
        ProductSummaryDTO response = productService.getProductBySku(sku);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "Get all products", description = "Retrieves a list of all existing products.")
    @ApiResponse(responseCode = "200", description = "Products retrieved successfully")
    public ResponseEntity<List<ProductSummaryDTO>> getAllProducts() {
        List<ProductSummaryDTO> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing product", description = "Updates product details by ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request payload"),
            @ApiResponse(responseCode = "404", description = "Product, Manufacturer, or Category not found"),
            @ApiResponse(responseCode = "409", description = "Product with this SKU already exists")
    })
    public ResponseEntity<ProductSummaryDTO> updateProduct(
            @PathVariable UUID id,
            @Valid @RequestBody ProductRequestDTO dto
    ) {
        ProductSummaryDTO response = productService.updateProduct(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete a product", description = "Deactivates a product by setting its status to inactive.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Product deactivated successfully"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<Void> softDeleteProduct(@PathVariable UUID id) {
        productService.softDeleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
