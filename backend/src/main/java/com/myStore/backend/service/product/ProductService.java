package com.myStore.backend.service.product;

import com.myStore.backend.dto.product.ProductRequestDTO;
import com.myStore.backend.dto.product.ProductResponseDTO;
import com.myStore.backend.dto.product.ProductSummaryDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public interface ProductService {

    ProductSummaryDTO createProduct(ProductRequestDTO dto);

    ProductSummaryDTO getProductById(UUID id);

    ProductSummaryDTO getProductBySku(String sku);

    List<ProductSummaryDTO> getAll();

    ProductSummaryDTO updateProduct(UUID id, ProductRequestDTO dto);

    void softDeleteProduct(UUID id);

    Integer calculateNewStock(UUID id, Integer toSubtract);

    Integer reStock(UUID id, Integer toAdd);




}
