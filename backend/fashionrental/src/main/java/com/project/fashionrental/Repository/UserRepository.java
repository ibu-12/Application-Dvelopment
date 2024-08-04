package com.project.fashionrental.Repository;

import com.project.fashionrental.models.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String username);

    
}
