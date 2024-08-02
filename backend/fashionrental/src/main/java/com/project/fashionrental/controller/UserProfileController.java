package com.project.fashionrental.controller;

import com.project.fashionrental.models.UserProfile;
import com.project.fashionrental.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @PostMapping("/addUserProfile")
    public ResponseEntity<UserProfile> addUserProfile(@RequestBody UserProfile userProfile) {
        UserProfile savedUserProfile = userProfileService.addUserProfile(userProfile);
        return new ResponseEntity<>(savedUserProfile, HttpStatus.CREATED);
    }

    @GetMapping("/getUserProfileById/{id}")
    public ResponseEntity<UserProfile> getUserProfileById(@PathVariable Long id) {
        UserProfile userProfile = userProfileService.getUserProfileById(id);
        if (userProfile != null) {
            return ResponseEntity.ok(userProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAllUserProfiles")
    public ResponseEntity<List<UserProfile>> getAllUserProfiles() {
        List<UserProfile> userProfiles = userProfileService.getAllUserProfiles();
        return ResponseEntity.ok(userProfiles);
    }

    @DeleteMapping("/deleteUserProfileById/{id}")
    public ResponseEntity<String> deleteUserProfileById(@PathVariable Long id) {
        boolean deleted = userProfileService.deleteUserProfileById(id);
        if (deleted) {
            return ResponseEntity.ok("Deleted UserProfile successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateUserProfile/{id}")
    public ResponseEntity<UserProfile> updateUserProfile(@PathVariable Long id, @RequestBody UserProfile userProfile) {
        UserProfile updatedUserProfile = userProfileService.updateUserProfile(id, userProfile);
        if (updatedUserProfile != null) {
            return ResponseEntity.ok(updatedUserProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}