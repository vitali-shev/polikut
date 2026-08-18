package com.polikut.infrastructure.integration.firebase;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "firebase")
public record FirebaseProperties(String baseUrl, String bucketName) {}
