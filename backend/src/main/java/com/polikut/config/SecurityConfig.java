package com.polikut.config;

import com.polikut.security.AuthFailureHandler;
import com.polikut.security.RestAuthenticationEntryPoint;
import com.polikut.security.SpaCsrfTokenRequestHandler;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final AuthFailureHandler authFailureHandler;
    private final SpaCsrfTokenRequestHandler spaCsrfTokenRequestHandler;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    public SecurityConfig(AuthFailureHandler authFailureHandler,
                          SpaCsrfTokenRequestHandler spaCsrfTokenRequestHandler,
                          RestAuthenticationEntryPoint restAuthenticationEntryPoint) {
        this.authFailureHandler = authFailureHandler;
        this.spaCsrfTokenRequestHandler = spaCsrfTokenRequestHandler;
        this.restAuthenticationEntryPoint = restAuthenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        return http
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(spaCsrfTokenRequestHandler)
                )
                .authorizeHttpRequests(auth ->
                        auth.anyRequest().permitAll())
                .formLogin(form -> form
                        .loginProcessingUrl("/api/auth/login")
                        .successHandler((request, response, authentication) ->
                                response.setStatus(HttpServletResponse.SC_OK)
                        )
                        .failureHandler(authFailureHandler))
                .exceptionHandling(e ->
                        e.authenticationEntryPoint(restAuthenticationEntryPoint))
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout")
                        .logoutSuccessHandler((request, response, authentication) ->
                                response.setStatus(HttpServletResponse.SC_OK)
                        ))
                .build();
    }
}
