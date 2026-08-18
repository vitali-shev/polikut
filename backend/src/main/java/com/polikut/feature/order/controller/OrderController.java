package com.polikut.feature.order.controller;

import com.polikut.feature.order.dto.request.OrderCreateRequest;
import com.polikut.feature.order.dto.request.OrderUpdateRequest;
import com.polikut.feature.order.dto.response.OrderCardResponse;
import com.polikut.feature.order.dto.response.OrderDetailsResponse;
import com.polikut.feature.order.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public OrderDetailsResponse create(@RequestBody OrderCreateRequest request) {
        return orderService.create(request);
    }
}
