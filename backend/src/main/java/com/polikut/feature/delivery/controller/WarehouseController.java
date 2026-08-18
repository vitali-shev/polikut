package com.polikut.feature.delivery.controller;

import com.polikut.feature.delivery.dto.WarehouseDto;
import com.polikut.feature.delivery.service.WarehouseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {

    private final WarehouseService warehouseService;

    public WarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @GetMapping
    public List<WarehouseDto> search(@RequestParam String settlementRef) {
        return warehouseService.search(settlementRef);
    }
}
