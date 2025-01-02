package com.prismablog.backend.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.prismablog.backend.models.PostComment;

public interface PostCommentRepository extends CrudRepository<PostComment, Long> {

  List<PostComment> findAllByPostId(Long id);
}
