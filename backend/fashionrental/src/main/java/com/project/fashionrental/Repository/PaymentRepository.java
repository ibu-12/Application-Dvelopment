package com.project.fashionrental.Repository;

import com.project.fashionrental.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment,Long> {

    
}
