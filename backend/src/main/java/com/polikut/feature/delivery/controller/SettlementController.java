package com.polikut.feature.delivery.controller;

import com.polikut.feature.delivery.dto.SettlementDto;
import com.polikut.feature.delivery.service.SettlementService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/settlements")
public class SettlementController {

    private final SettlementService settlementService;

    public SettlementController(SettlementService settlementService) {
        this.settlementService = settlementService;
    }

    @GetMapping()
    public List<SettlementDto> search(@RequestParam String search) {
        return settlementService.search(search);
    }
}
