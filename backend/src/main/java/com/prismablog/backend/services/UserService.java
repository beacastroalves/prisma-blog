package com.prismablog.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.prismablog.backend.controllers.dto.request.UserRequest;
import com.prismablog.backend.controllers.dto.response.UserResponse;
import com.prismablog.backend.models.User;
import com.prismablog.backend.repositories.UserRepository;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<UserResponse> fetchAll() {
    List<User> users = new ArrayList<>();
    this.userRepository.findAll().forEach(users::add);

    return mapToUserResponses(users);
  }

  public User setIsAdmin(Long id, UserRequest request) {
    User user = this.userRepository.findById(id).orElseThrow();

    String role;

    if(request.isAdmin()) {
      role = "ADMIN";
    } else {
      role = "STANDARD";
    }

    user.setRole(role);

    this.userRepository.save(user);

    return user;
  }

  private List<UserResponse> mapToUserResponses(List<User> users) {
    return users.stream().map(user -> new UserResponse(user)).toList();
  }
}
