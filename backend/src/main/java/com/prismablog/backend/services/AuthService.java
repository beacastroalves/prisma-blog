package com.prismablog.backend.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.prismablog.backend.controllers.dto.request.AuthRequest;
import com.prismablog.backend.controllers.dto.response.AuthResponse;
import com.prismablog.backend.models.User;
import com.prismablog.backend.repositories.UserRepository;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthService(
    UserRepository userRepository,
    PasswordEncoder passwordEncoder,
    JwtService jwtService,
    AuthenticationManager authenticationManager
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  public AuthResponse signUp(AuthRequest request) {
    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(this.passwordEncoder.encode(request.getPassword()));

    user = this.userRepository.save(user);

    this.authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
    );

    return mapperToAuthResponse(user);
  }

  public AuthResponse signIn(AuthRequest request) {
    this.authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
    );

    User user = this.userRepository.findByUsername(request.getUsername()).orElse(null);

    return mapperToAuthResponse(user);
  }

  private AuthResponse mapperToAuthResponse(User user) {
    String token = this.jwtService.generateToken(user);

    AuthResponse response = new AuthResponse();
    response.setToken(token);
    response.setExpiresIn(this.jwtService.getExpirationTime());
    response.setUsername(user.getUsername());

    return response;
  }
}
