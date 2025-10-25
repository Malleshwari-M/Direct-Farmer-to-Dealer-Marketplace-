package com.farmerdealer.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Farmer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String name;
  private String email;
  private String password;

  @OneToMany(mappedBy = "farmer")
  private List<Product> products;

}
