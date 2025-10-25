package com.farmerdealer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.farmerdealer.repository.ProductRepository;
import com.farmerdealer.model.Product;

import java.util.List;

@Service
public class ProductService {
  @Autowired
  private ProductRepository productRepository;

  public Product saveProduct(Product product) {
    return productRepository.save(product);
  }

  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }
}
