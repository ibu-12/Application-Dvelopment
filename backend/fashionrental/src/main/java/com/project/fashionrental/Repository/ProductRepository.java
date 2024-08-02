package com.project.fashionrental.Repository;

import com.project.fashionrental.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {

    
}
