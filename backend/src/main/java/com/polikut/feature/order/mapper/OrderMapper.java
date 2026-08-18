package com.polikut.feature.order.mapper;

import com.polikut.feature.order.dto.request.OrderCreateRequest;
import com.polikut.feature.order.dto.response.OrderCardResponse;
import com.polikut.feature.order.dto.response.OrderDetailsResponse;
import com.polikut.feature.order.dto.response.OrderItemResponse;
import com.polikut.feature.order.entity.DeliveryDetails;
import com.polikut.feature.order.entity.Order;
import com.polikut.infrastructure.integration.firebase.FirebaseStorageService;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    private final FirebaseStorageService firebaseStorageService;

    public OrderMapper(FirebaseStorageService firebaseStorageService) {
        this.firebaseStorageService = firebaseStorageService;
    }

    public DeliveryDetails toDeliveryDetails(OrderCreateRequest request) {
        DeliveryDetails details = new DeliveryDetails();

        details.setDeliveryMethod(request.deliveryMethod());
        details.setSettlementName(request.settlement().displayName());
        details.setSettlementRef(request.settlement().ref());

        if (request.novaPoshtaWarehouse() != null) {
            details.setWarehouseName(request.novaPoshtaWarehouse().description());
            details.setWarehouseRef(request.novaPoshtaWarehouse().ref());
        } else {
            details.setUkrposhtaAddress(request.ukrposhtaAddress());
        }

        return details;
    }

    public OrderCardResponse toAdminOrderCardResponse(Order order) {
        return new OrderCardResponse(
                order.getId(),
                order.getOrderStatus(),
                order.getDeliveryDetails().getDeliveryMethod(),
                order.getPaymentMethod(),
                order.getPaymentStatus(),
                order.getCreatedAt(),
                order.getTotalPrice()
        );
    }

    public OrderDetailsResponse toOrderDetailsResponse(Order order) {
        return new OrderDetailsResponse(
                order.getId(),
                order.getOrderStatus(),
                order.getFullName(),
                order.getPhoneNumber(),
                order.getComment(),
                order.getDeliveryDetails().getDeliveryMethod(),
                order.getDeliveryDetails().getSettlementName(),
                order.getDeliveryDetails().getSettlementRef(),
                order.getDeliveryDetails().getWarehouseName(),
                order.getDeliveryDetails().getWarehouseRef(),
                order.getDeliveryDetails().getUkrposhtaAddress(),
                order.getPaymentMethod(),
                order.getPaymentStatus(),
                order.getDeliveryDetails().getTrackingNumber(),
                order.getCreatedAt(),
                order.getTotalPrice(),
                order.getItems().stream()
                        .map(item -> new OrderItemResponse(item.price(), item.quantity(), item.title(),
                                firebaseStorageService.buildUrl(item.thumbnailPath())))
                        .toList()
        );
    }
}
