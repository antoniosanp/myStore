package com.myStore.backend.repository;

import com.myStore.backend.model.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ManufacturerRepository extends JpaRepository<Manufacturer, UUID> {
    Optional<Manufacturer> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);
}

