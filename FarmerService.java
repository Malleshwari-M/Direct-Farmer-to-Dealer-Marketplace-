package com.farmerdealer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.farmerdealer.model.Farmer;
import com.farmerdealer.repository.FarmerRepository;

@Service
public class FarmerService {
    @Autowired
    private FarmerRepository farmerRepository;

    public Farmer registerFarmer(Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    public Farmer loginFarmer(String email, String password) {
        Farmer f = farmerRepository.findByEmail(email);
        if (f != null && f.getPassword().equals(password)) {
            return f;
        }
        return null;
    }

    public Farmer findById(Integer id) {
        return farmerRepository.findById(id).orElse(null);
    }
}
