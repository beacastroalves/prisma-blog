package com.prismablog.backend.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/storage")
public class StorageController {

  @GetMapping("/{imageName}")
  public ResponseEntity<?> download(@PathVariable String imageName) throws IOException {

    Resource resource = new ClassPathResource("static/" + imageName + ".png");

    if (!resource.exists()) {
      return ResponseEntity.notFound().build();
    }

    byte[] imageData = Files.readAllBytes(resource.getFile().toPath());

    return ResponseEntity
    .status(200)
    .contentType(MediaType.IMAGE_PNG)
    .body(imageData);
  }

  @PostMapping("/{imageName}")
  public ResponseEntity<?> upload(@PathVariable String imageName, @RequestParam("file") MultipartFile file) throws IOException {

    if (!file.getContentType().equals("image/png")) {
      return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("PNG Format required");
    }

    String staticDir = "src/main/resources/static/";

    byte[] bytes = file.getBytes();

    Path path = Paths.get(staticDir + imageName + ".png");
    Files.write(path, bytes);

    return ResponseEntity.status(200).body("Success");
  }

}
