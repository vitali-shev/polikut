package com.polikut.feature.order.service;

import com.polikut.feature.order.dto.request.OrderCreateRequest;
import com.polikut.feature.order.dto.request.OrderUpdateRequest;
import com.polikut.feature.order.dto.response.OrderCardResponse;
import com.polikut.feature.order.dto.response.OrderDetailsResponse;
import com.polikut.feature.order.entity.DeliveryDetails;
import com.polikut.feature.order.entity.Order;
import com.polikut.feature.order.entity.OrderItem;
import com.polikut.feature.order.enums.OrderStatus;
import com.polikut.feature.order.enums.PaymentStatus;
import com.polikut.feature.order.exception.OrderNotFoundException;
import com.polikut.feature.order.mapper.OrderMapper;
import com.polikut.feature.order.repository.OrderRepository;
import com.polikut.feature.product.entity.Product;
import com.polikut.feature.product.exception.ProductNotFoundException;
import com.polikut.feature.product.repository.ProductRepository;
import com.polikut.infrastructure.integration.telegram.service.TelegramNotificationService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;
    private final TelegramNotificationService telegramNotificationService;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        OrderMapper orderMapper,
                        TelegramNotificationService telegramNotificationService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderMapper = orderMapper;
        this.telegramNotificationService = telegramNotificationService;
    }

    // public
    public OrderDetailsResponse getDetails(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(OrderNotFoundException::new);
        return orderMapper.toOrderDetailsResponse(order);
    }

    // admin
    public List<OrderCardResponse> getCards() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(orderMapper::toAdminOrderCardResponse)
                .toList();
    }

    @Transactional
    public void update(Long id, OrderUpdateRequest request) {
        Order order = orderRepository.findById(id).orElseThrow(OrderNotFoundException::new);
        order.updateFromRequest(request);
    }

    public void delete(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(OrderNotFoundException::new);
        orderRepository.delete(order);
    }

    public OrderDetailsResponse create(OrderCreateRequest request) {
        Order order = new Order();

        order.setFullName(request.fullName());
        order.setPhoneNumber(request.phoneNumber());
        DeliveryDetails deliveryDetails = orderMapper.toDeliveryDetails(request);
        order.setDeliveryDetails(deliveryDetails);
        order.setPaymentMethod(request.paymentMethod());
        order.setComment(request.comment());
        order.setPaymentStatus(PaymentStatus.UNPAID);
        order.setOrderStatus(OrderStatus.PENDING);

        List<OrderItem> orderItems = new ArrayList<>();
        int totalPrice = 0;
        for (OrderCreateRequest.ProductItem productItem : request.productItems()) {

            Product product = productRepository.findById(productItem.id()).orElseThrow(ProductNotFoundException::new);
            OrderItem orderItem = new OrderItem(
                    product.getCurrentPrice(),
                    productItem.quantity(),
                    product.getTitle(),
                    product.getThumbnailPath());

            totalPrice += product.getCurrentPrice() * productItem.quantity();
            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);
        telegramNotificationService.notifyNewOrder(order.getId(), order.getTotalPrice());

        return orderMapper.toOrderDetailsResponse(savedOrder);
    }
}
