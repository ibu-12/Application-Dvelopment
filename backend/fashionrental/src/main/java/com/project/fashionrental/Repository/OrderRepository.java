package com.project.fashionrental.Repository;

import com.project.fashionrental.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {

    
}
