package com.polikut.feature.order.dto.request;

import com.polikut.feature.delivery.dto.SettlementDto;
import com.polikut.feature.delivery.dto.WarehouseDto;
import com.polikut.feature.order.enums.DeliveryMethod;
import com.polikut.feature.order.enums.PaymentMethod;

import java.util.List;

public record OrderCreateRequest(
        String fullName,
        String phoneNumber,
        String comment,
        DeliveryMethod deliveryMethod,
        SettlementDto settlement,
        WarehouseDto novaPoshtaWarehouse,
        String ukrposhtaAddress,
        PaymentMethod paymentMethod,
        List<ProductItem> productItems) {

    public record ProductItem(Long id, int quantity) {
    }
}
