package com.polikut.feature.delivery.entity;

import jakarta.persistence.*;

@Entity
public class Warehouse {

    @Id
    private String ref;
    private String description;
    private String settlementRef;
    private String categoryOfWarehouse;

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSettlementRef() {
        return settlementRef;
    }

    public void setSettlementRef(String settlementRef) {
        this.settlementRef = settlementRef;
    }

    public String getCategoryOfWarehouse() {
        return categoryOfWarehouse;
    }

    public void setCategoryOfWarehouse(String categoryOfWarehouse) {
        this.categoryOfWarehouse = categoryOfWarehouse;
    }
}
