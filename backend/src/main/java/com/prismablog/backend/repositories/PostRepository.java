package com.prismablog.backend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.prismablog.backend.models.Post;

public interface PostRepository extends CrudRepository<Post, Long> {
}
