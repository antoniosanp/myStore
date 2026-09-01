package com.myStore.backend.repository;

import com.myStore.backend.model.Category;
import com.myStore.backend.model.Manufacturer;
import com.myStore.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    List<Product> findByManufacturer(Manufacturer manufacturer);

    List<Product> findByCategories(Category category);

    List<Product> findByManufacturerId(UUID manufacturerId);

    List<Product> findByCategoriesId(UUID categoryId);

    Optional<Product> findByNameIgnoreCase(String name);

    Optional<Product> findBySku(String sku);

    boolean existsByNameIgnoreCase(String name);

    boolean existsBySku(String sku);
}
