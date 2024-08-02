package com.project.fashionrental.service;

import com.project.fashionrental.models.UserProfile;
import com.project.fashionrental.Repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    public UserProfile addUserProfile(UserProfile userProfile) {
        return userProfileRepository.save(userProfile);
    }

    public UserProfile getUserProfileById(Long id) {
        Optional<UserProfile> optionalUserProfile = userProfileRepository.findById(id);
        return optionalUserProfile.orElse(null);
    }

    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }

    public boolean deleteUserProfileById(Long id) {
        if (userProfileRepository.existsById(id)) {
            userProfileRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public UserProfile updateUserProfile(Long id, UserProfile updatedUserProfile) {
        Optional<UserProfile> optionalUserProfile = userProfileRepository.findById(id);
        if (optionalUserProfile.isPresent()) {
            UserProfile userProfile = optionalUserProfile.get();
            userProfile.setName(updatedUserProfile.getName());
            userProfile.setEmail(updatedUserProfile.getEmail());
            userProfile.setPassword(updatedUserProfile.getPassword());
            userProfile.setMobile(updatedUserProfile.getMobile());
            userProfile.setAge(updatedUserProfile.getAge());
            userProfile.setImage(updatedUserProfile.getImage());
            userProfile.setGender(updatedUserProfile.getGender());
            userProfile.setLocation(updatedUserProfile.getLocation());
            userProfile.setContactInfo(updatedUserProfile.getContactInfo());
            return userProfileRepository.save(userProfile);
        }
        return null;
    }
}
