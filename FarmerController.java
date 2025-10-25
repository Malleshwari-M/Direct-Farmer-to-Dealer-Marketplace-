package com.farmerdealer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.farmerdealer.model.Product;
import com.farmerdealer.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/farmer")
@CrossOrigin(origins = "*")
public class FarmerController {

  @Autowired
  private ProductService productService;

  @PostMapping("/addProduct")
  public Product addProduct(@RequestBody Product product) {
    return productService.saveProduct(product);
  }

  @GetMapping("/products")
  public List<Product> getProducts() {
    return productService.getAllProducts();
  }
}
