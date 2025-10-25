package com.farmerdealer.model;

import jakarta.persistence.*;

@Entity
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String name;
  private double price;
  private int quantity;

  @ManyToOne
  @JoinColumn(name = "farmer_id")
  private Farmer farmer;

}
