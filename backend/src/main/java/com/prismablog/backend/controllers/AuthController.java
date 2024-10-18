package com.prismablog.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prismablog.backend.controllers.dto.request.AuthRequest;
import com.prismablog.backend.services.AuthService;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/signIn")
  public ResponseEntity<?> signIn(@RequestBody AuthRequest authRequest) {
    return ResponseEntity.ok(authService.signIn(authRequest));
  }

  @PostMapping("/signUp")
  public ResponseEntity<?> signUp(@RequestBody AuthRequest authRequest) {
    return ResponseEntity.ok(authService.signUp(authRequest));
  }

  @GetMapping("/hello")
  public ResponseEntity<?> hello() {
    return ResponseEntity.ok("Hello World!");
  }
}
