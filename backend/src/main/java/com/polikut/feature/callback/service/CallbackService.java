package com.polikut.feature.callback.service;

import com.polikut.feature.callback.dto.CallbackRequest;
import com.polikut.external.telegram.service.TelegramNotificationService;
import org.springframework.stereotype.Service;

@Service
public class CallbackService {

    private final TelegramNotificationService telegramNotificationService;

    public CallbackService(TelegramNotificationService telegramNotificationService) {
        this.telegramNotificationService = telegramNotificationService;
    }

    public void sendCallback(CallbackRequest request) {
        telegramNotificationService.notifyCallback(
                request.productTitle(),
                request.phoneNumber(),
                request.comment());
    }
}
