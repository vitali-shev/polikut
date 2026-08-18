package com.polikut.feature.order.entity;

import com.polikut.feature.order.enums.DeliveryMethod;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Embeddable
public class DeliveryDetails {

    @Enumerated(EnumType.STRING)
    private DeliveryMethod deliveryMethod;

    private String settlementName;
    private String settlementRef; // UUID міста з API пошти

    private String warehouseName; // "Відділення №15" або "вул. Курсова, 33, кв. 72"
    private String warehouseRef; // UUID відділення/поштомату з API пошти
    private String ukrposhtaAddress;

    private String trackingNumber;

    public DeliveryMethod getDeliveryMethod() {
        return deliveryMethod;
    }

    public void setDeliveryMethod(DeliveryMethod deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    public String getSettlementName() {
        return settlementName;
    }

    public void setSettlementName(String settlementName) {
        this.settlementName = settlementName;
    }

    public String getSettlementRef() {
        return settlementRef;
    }

    public void setSettlementRef(String settlementRef) {
        this.settlementRef = settlementRef;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public String getWarehouseRef() {
        return warehouseRef;
    }

    public void setWarehouseRef(String warehouseRef) {
        this.warehouseRef = warehouseRef;
    }

    public String getUkrposhtaAddress() {
        return ukrposhtaAddress;
    }

    public void setUkrposhtaAddress(String ukrposhtaAddress) {
        this.ukrposhtaAddress = ukrposhtaAddress;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }
}
