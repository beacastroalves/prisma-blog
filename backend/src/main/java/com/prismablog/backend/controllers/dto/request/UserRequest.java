package com.prismablog.backend.controllers.dto.request;

public class UserRequest {

  private boolean isAdmin;

  public boolean isAdmin() {
    return isAdmin;
  }

  public void setIsAdmin(boolean isAdmin) {
    this.isAdmin = isAdmin;
  }
}
