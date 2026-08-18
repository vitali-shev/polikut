package com.polikut.feature.callback.controller;

import com.polikut.feature.callback.dto.CallbackRequest;
import com.polikut.feature.callback.service.CallbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/callbacks")
public class CallbackController {

    private final CallbackService callbackService;

    public CallbackController(CallbackService callbackService) {
        this.callbackService = callbackService;
    }

    @PostMapping
    public ResponseEntity<Void> sendCallback(@RequestBody CallbackRequest request) {
        callbackService.sendCallback(request);
        return ResponseEntity.noContent().build();
    }
}
