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
import com.prismablog.backend.services.PostService;

@CrossOrigin
@RestController
@RequestMapping("/posts")
public class PostController {

  private final PostService postService;

  public PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping
  public ResponseEntity<?> fetAll() {
    return ResponseEntity.ok(this.postService.fetchAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> fetchById(@PathVariable Long id) {
    return ResponseEntity.ok(this.postService.fetchById(id));
  }

  @PostMapping
  public ResponseEntity<?> store(@RequestBody PostRequest request) {
    return ResponseEntity.ok(this.postService.store(request));
  }

  @PutMapping("{id}")
  public ResponseEntity<?> update(@PathVariable Long id, @RequestBody PostRequest request) {
    return ResponseEntity.ok(this.postService.update(id, request));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return ResponseEntity.ok(this.postService.delete(id));
  }

  @GetMapping("{id}/comments")
  public ResponseEntity<?> fetchAllComments(@PathVariable Long id) {
    return ResponseEntity.ok("PostId: " + id + " comments");
  }

  @PostMapping("{id}/comments")
  public ResponseEntity<?> storeComment(@PathVariable Long id) {
    return ResponseEntity.ok("PostId: " + id + " comments store");
  }

  @PutMapping("{id}/comments/{commentId}")
  public ResponseEntity<?> updateComment(@PathVariable Long id, @PathVariable Long commentId) {
    return ResponseEntity.ok("PostId: " + id + " comments update commentId: " + commentId);
  }

  @DeleteMapping("{id}/comments/{commentId}")
  public ResponseEntity<?> deleteComment(@PathVariable Long id, @PathVariable Long commentId) {
    return ResponseEntity.ok("PostId: " + id + " comments update commentId: " + commentId);
  }
}
