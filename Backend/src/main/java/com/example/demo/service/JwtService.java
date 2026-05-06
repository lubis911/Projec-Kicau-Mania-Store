package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class JwtService {

    public String generateToken(String email) {
        return "TOKEN_" + email;
    }

    public String extractUsername(String token) {

        if (token.startsWith("TOKEN_")) {
            return token.replace("TOKEN_", "");
        }

        return null;
    }

    public boolean isTokenValid(String token, String email) {
        return token.equals("TOKEN_" + email);
    }
}