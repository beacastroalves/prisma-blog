package com.prismablog.backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final AuthenticationProvider authenticationProvider;
  // private JwtAuthFilter jwtAuthFilter;

  public SecurityConfig(
    AuthenticationProvider authenticationProvider
    // , JwtAuthFilter jwtAuthFilter;
  ) {
    this.authenticationProvider = authenticationProvider;
    // this.jwtAuthFilter = jwtAuthFilter;
  }

  @Bean
  public SecurityFilterChain SecurityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(httpRequest -> {
        httpRequest.requestMatchers("/auth/**")
          .permitAll()
          .anyRequest()
          .authenticated();
      })
      .sessionManagement(session -> {
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
      })
      .authenticationProvider(authenticationProvider);
      // .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}
