package com.prismablog.backend.controllers.dto.response;

import com.prismablog.backend.models.User;

public class UserResponse {

  private Long id;
  private String username;
  private String role;

  public UserResponse(User user) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.role = user.getRole();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

}
