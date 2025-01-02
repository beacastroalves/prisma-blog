package com.prismablog.backend.controllers.dto.response;

import java.time.LocalDateTime;

public class PostResponse {

  private Long id;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private String title;
  private String description;

  private PostUserResponse user;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public PostUserResponse getUser() {
    return user;
  }

  public void setUser(PostUserResponse user) {
    this.user = user;
  }
}
