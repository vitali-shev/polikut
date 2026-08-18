package com.polikut.feature.delivery.mapper;

import com.polikut.feature.delivery.dto.WarehouseDto;
import com.polikut.infrastructure.integration.novaposhta.dto.nova_poshta_response.WarehouseResponse;
import com.polikut.feature.delivery.entity.Warehouse;

public class WarehouseMapper {

    public static Warehouse toWarehouse(WarehouseResponse warehouseResponse) {
        Warehouse warehouse = new Warehouse();

        warehouse.setRef(warehouseResponse.ref());
        warehouse.setDescription(warehouseResponse.description());
        warehouse.setSettlementRef(warehouseResponse.settlementRef());
        warehouse.setCategoryOfWarehouse(warehouseResponse.categoryOfWarehouse());

        return warehouse;
    }

    public static WarehouseDto toWarehouseResponse(Warehouse warehouse) {
        return new WarehouseDto(warehouse.getRef(), warehouse.getDescription(), warehouse.getCategoryOfWarehouse());
    }
}
