package com.prismablog.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prismablog.backend.controllers.dto.request.UserRequest;
import com.prismablog.backend.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<?> fetcaAll() {
    return ResponseEntity.ok(this.userService.fetchAll());
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> setIsAdmin(@PathVariable Long id, @RequestBody UserRequest request) {
    return ResponseEntity.ok(this.userService.setIsAdmin(id, request));
  }
}
