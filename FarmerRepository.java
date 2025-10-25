package com.farmerdealer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.farmerdealer.model.Farmer;

public interface FarmerRepository extends JpaRepository<Farmer, Integer> {
    Farmer findByEmail(String email);
}
