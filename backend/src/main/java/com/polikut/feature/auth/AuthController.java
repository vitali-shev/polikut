package com.polikut.feature.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/status")
    public AuthResponse status(Principal principal) {
        return new AuthResponse(principal != null);
    }
}
