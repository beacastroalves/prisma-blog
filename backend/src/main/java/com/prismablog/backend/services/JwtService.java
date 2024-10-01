package com.prismablog.backend.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
  
  public String extractUsername(String token) {
    return null;
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    return false;
  }
}
