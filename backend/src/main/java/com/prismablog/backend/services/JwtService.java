package com.prismablog.backend.services;

import org.springframework.security.core.userdetails.UserDetails;

public class JwtService {
  
  public String extractUsername(String token) {
    return null;
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    return false;
  }
}
