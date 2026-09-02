package com.myStore.backend.repository;

import com.myStore.backend.model.Category;
import com.myStore.backend.model.Manufacturer;
import com.myStore.backend.model.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    @Override
    @EntityGraph(attributePaths = {"manufacturer", "categories"})
    List<Product> findAll();

    @Override
    @EntityGraph(attributePaths = {"manufacturer", "categories"})
    Optional<Product> findById(UUID id);

    @EntityGraph(attributePaths = {"manufacturer", "categories"})
    List<Product> findByManufacturer(Manufacturer manufacturer);

    @EntityGraph(attributePaths = {"manufacturer", "categories"})
    List<Product> findByCategories(Category category);

    @EntityGraph(attributePaths = {"manufacturer", "categories"})
    List<Product> findByManufacturerId(UUID manufacturerId);

    @EntityGraph(attributePaths = {"manufacturer", "categories"})
    List<Product> findByCategoriesId(UUID categoryId);

    Optional<Product> findByNameIgnoreCase(String name);

    @EntityGraph(attributePaths = {"manufacturer", "categories"})
    Optional<Product> findBySku(String sku);

    boolean existsByNameIgnoreCase(String name);

    boolean existsBySku(String sku);
}

