package com.prismablog.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.prismablog.backend.controllers.dto.request.PostCommentRequest;
import com.prismablog.backend.controllers.dto.request.PostRequest;
import com.prismablog.backend.controllers.dto.response.PostCommentResponse;
import com.prismablog.backend.controllers.dto.response.PostResponse;
import com.prismablog.backend.controllers.dto.response.PostUserResponse;
import com.prismablog.backend.models.Post;
import com.prismablog.backend.models.PostComment;
import com.prismablog.backend.models.User;
import com.prismablog.backend.repositories.PostCommentRepository;
import com.prismablog.backend.repositories.PostRepository;
import com.prismablog.backend.repositories.UserRepository;

@Service
public class PostService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final PostCommentRepository postCommentRepository;

  public PostService(
    PostRepository postRepository,
    UserRepository userRepository,
    PostCommentRepository postCommentRepository
  ) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.postCommentRepository = postCommentRepository;
  }

  public List<PostResponse> fetchAll() {
    List<Post> posts = new ArrayList<>();
    postRepository.findAll().forEach(posts::add);

    return mapperToPostResponses(posts);
  }

  public PostResponse fetchById(Long id) {
    return mapperToPostResponse(this.postRepository.findById(id).orElse(null));
  }

  public PostResponse store(PostRequest request) {
    Post post = new Post();
    post.setTitle(request.getTitle());
    post.setDescription(request.getDescription());

    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = this.userRepository.findByUsername(username).orElseThrow();

    post.setUser(user);

    post = this.postRepository.save(post);

    return mapperToPostResponse(post);
  }

  public PostResponse update(Long id, PostRequest request) {
    Post post = this.postRepository.findById(id).orElseThrow();

    post.setTitle(request.getTitle());
    post.setDescription(request.getDescription());

    post = this.postRepository.save(post);

    return mapperToPostResponse(post);
  }

  public PostResponse delete(Long id) {
    Optional<Post> optional = this.postRepository.findById(id);
    if (optional.isPresent()) {
      this.postRepository.deleteById(id);

      return mapperToPostResponse(optional.get());
    }

    return null;
  }

  public List<PostCommentResponse> fetchAllComments(Long id) {
    return mapperToPostCommentResponses(this.postCommentRepository.findAllByPostId(id));
  }

  public PostCommentResponse storeComment(Long id, PostCommentRequest request) {
    PostComment postComment = new PostComment();
    postComment.setText(request.getText());

    Post post = this.postRepository.findById(id).orElseThrow();
    postComment.setPost(post);


    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = this.userRepository.findByUsername(username).orElseThrow();
    postComment.setUser(user);

    postComment = this.postCommentRepository.save(postComment);

    return mapperToPostCommentResponse(postComment);
  }

  public PostCommentResponse updateComment(Long commentId, PostCommentRequest request) {
    PostComment postComment = this.postCommentRepository.findById(commentId).orElseThrow();
    postComment.setText(request.getText());

    this.postCommentRepository.save(postComment);

    return mapperToPostCommentResponse(postComment);
  }

  public PostCommentResponse deleteComment(Long commentId) {
    Optional<PostComment> optional = this.postCommentRepository.findById(commentId);
    if (optional.isPresent()) {
      this.postCommentRepository.deleteById(commentId);

      return mapperToPostCommentResponse(optional.get());
    }

    return null;
  }

  private List<PostResponse> mapperToPostResponses(List<Post> posts) {
    return posts.stream().map(post -> mapperToPostResponse(post)).toList();
  }

  private PostResponse mapperToPostResponse(Post post) {
    if (post == null) {
      return null;
    }

    PostResponse response = new PostResponse();
    response.setId(post.getId());
    response.setCreatedAt(post.getCreatedAt());
    response.setUpdatedAt(post.getUpdatedAt());
    response.setTitle(post.getTitle());
    response.setDescription(post.getDescription());

    if (post.getUser() != null) {
      response.setUser(mapperToPostUserResponse(post.getUser()));
    }

    return response;
  }

  private PostUserResponse mapperToPostUserResponse(User user) {
    PostUserResponse response = new PostUserResponse();
    response.setUsername(user.getUsername());

    return response;
  }

  private List<PostCommentResponse> mapperToPostCommentResponses(List<PostComment> postComments) {
    return postComments.stream().map(postComment -> mapperToPostCommentResponse(postComment)).toList();
  }

  private PostCommentResponse mapperToPostCommentResponse(PostComment postComment) {
    PostCommentResponse response = new PostCommentResponse();
    response.setUpdatedAt(postComment.getUpdatedAt());
    response.setId(postComment.getId());
    response.setText(postComment.getText());
    response.setUsername(postComment.getUser().getUsername());

    return response;
  }
}
