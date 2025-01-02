package com.prismablog.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prismablog.backend.controllers.dto.request.PostRequest;

@CrossOrigin
@RestController
@RequestMapping("/posts")
public class PostController {

  @GetMapping
  public ResponseEntity<?> fetAll() {
    return ResponseEntity.ok("All posts");
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> fetchById(@PathVariable Long id) {
    return ResponseEntity.ok("User ID: " + id);
  }

  @PostMapping
  public ResponseEntity<?> store(@RequestBody PostRequest request) {
    return ResponseEntity.ok("Creating post, title: " + request.getTitle() + ", description: " + request.getDescription());
  }

  @PutMapping("{id}")
  public ResponseEntity<?> update(@PathVariable Long id, @RequestBody PostRequest request) {
    return ResponseEntity.ok("Updated postId: " + id + " with the values -> title: " + request.getTitle() + ", description: " + request.getDescription());
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return ResponseEntity.ok("Trying to delete post id: " + id);
  }
}