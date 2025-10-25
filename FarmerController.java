package com.farmerdealer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.farmerdealer.model.Farmer;
import com.farmerdealer.model.Product;
import com.farmerdealer.service.FarmerService;
import com.farmerdealer.service.ProductService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/farmer")
@CrossOrigin(origins = "*")
public class FarmerController {

    @Autowired
    private FarmerService farmerService;

    @Autowired
    private ProductService productService;

    @PostMapping("/register")
    public Farmer register(@RequestBody Farmer farmer) {
        return farmerService.registerFarmer(farmer);
    }

    @PostMapping("/login")
    public Farmer login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        Farmer f = farmerService.loginFarmer(email, password);
        if (f == null) throw new RuntimeException("Invalid credentials");
        return f;
    }

    // expects JSON with name,price,quantity,description,farmerId
    @PostMapping("/addProduct")
    public Product addProduct(@RequestBody Map<String, Object> body) {
        String name = (String) body.get("name");
        Double price = body.get("price") instanceof Number ? ((Number) body.get("price")).doubleValue() : Double.parseDouble(String.valueOf(body.get("price")));
        String quantity = (String) body.get("quantity");
        String description = body.get("description") == null ? null : (String) body.get("description");
        Integer farmerId = body.get("farmerId") == null ? null : (Integer) ( (Number) body.get("farmerId") ).intValue();

        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        p.setQuantity(quantity);
        p.setDescription(description);

        if (farmerId != null) {
            Farmer farmer = farmerService.findById(farmerId);
            p.setFarmer(farmer);
        }

        return productService.saveProduct(p);
    }

    @GetMapping("/products")
    public List<Product> getFarmerProducts() {
        return productService.getAllProducts();
    }
}
