package com.prismablog.backend.controllers.dto.request;

public class PostCommentRequest {

  private String text;

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }
}
