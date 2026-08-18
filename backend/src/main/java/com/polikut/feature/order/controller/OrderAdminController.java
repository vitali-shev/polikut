package com.polikut.feature.order.controller;

import com.polikut.feature.order.dto.request.OrderUpdateRequest;
import com.polikut.feature.order.dto.response.OrderCardResponse;
import com.polikut.feature.order.dto.response.OrderDetailsResponse;
import com.polikut.feature.order.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin/orders")
public class OrderAdminController {

    private final OrderService orderService;

    public OrderAdminController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<OrderCardResponse> getCards() {
        return orderService.getCards();
    }

    @GetMapping("/{id}")
    public OrderDetailsResponse getDetails(@PathVariable Long id) {
        return orderService.getDetails(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @RequestBody OrderUpdateRequest request) {
        orderService.update(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        orderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
