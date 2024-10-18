package com.prismablog.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/storage")
public class StorageController {

  @GetMapping("/{imageName}")
  public ResponseEntity<?> download(@PathVariable String imageName) {
    return ResponseEntity.ok(imageName + ".png");
  }

  @PostMapping("/{imageName}")
  public ResponseEntity<?> upload() {
    return ResponseEntity.ok("It works!");
  }
}
