package com.polikut.exception;

import java.time.Instant;

public class ErrorResponse {

    public final int status;
    public final String code;
    public final String message;
    public final Instant timestamp;

    public ErrorResponse(int status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.timestamp = Instant.now();
    }
}
