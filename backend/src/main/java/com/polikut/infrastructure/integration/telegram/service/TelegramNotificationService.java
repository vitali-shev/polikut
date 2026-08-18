package com.polikut.infrastructure.integration.telegram.service;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.model.request.ParseMode;
import com.pengrad.telegrambot.request.SendMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Indexed;
import org.springframework.stereotype.Service;

@Service
public class TelegramNotificationService {

    private final TelegramBot telegramBot;
    private final String chatId;

    public TelegramNotificationService(TelegramBot telegramBot,
                                       @Value("${telegram.bot.chat-id}") String chatId) {
        this.telegramBot = telegramBot;
        this.chatId = chatId;
    }

    public void notifyCallback(String productTitle, String phoneNumber, String comment) {
        String text = """
                📞 <b>Запит на зворотний дзвінок</b>
                
                <b>Товар:</b> %s
                <b>Телефон:</b> %s
                <b>Коментар:</b> %s
                """.formatted(productTitle == null ? "-" : productTitle,
                phoneNumber,
                comment.isBlank() ? "-" : comment);

        telegramBot.execute(new SendMessage(chatId, text).parseMode(ParseMode.HTML));
    }

    public void notifyNewOrder(Long orderId, int totalPrice) {
        String text = """
                🛍️ <b>Надійшло нове замовлення!</b>
                
                <b>Нове замовлення:</b> %s
                <b>Загальна сума:</b> %s грн.
                
                Перевірте деталі в адмін-панелі.
                """.formatted(
                String.format("%06d", orderId),
                totalPrice);

        telegramBot.execute(new SendMessage(chatId, text).parseMode(ParseMode.HTML));
    }
}
