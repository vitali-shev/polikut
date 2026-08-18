package com.polikut.feature.delivery.service;

import com.polikut.feature.delivery.dto.WarehouseDto;
import com.polikut.feature.delivery.entity.Warehouse;
import com.polikut.feature.delivery.mapper.WarehouseMapper;
import com.polikut.feature.delivery.repository.WarehouseRepository;
import com.polikut.infrastructure.integration.novaposhta.client.NovaPoshtaClient;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {

    private final NovaPoshtaClient novaPoshtaClient;
    private final WarehouseRepository warehouseRepository;

    public WarehouseService(NovaPoshtaClient novaPoshtaClient, WarehouseRepository warehouseRepository) {
        this.novaPoshtaClient = novaPoshtaClient;
        this.warehouseRepository = warehouseRepository;
    }

    @Transactional
    @Scheduled(cron = "0 52 22 * * SAT")
    public void syncWarehouses() throws InterruptedException {
            int page = 1;
            warehouseRepository.deleteAllInBatch();

            while (true) {
                List<Warehouse> warehouses =
                        novaPoshtaClient.getWarehouses(page)
                                .stream()
                                .map(WarehouseMapper::toWarehouse)
                                .toList();

                if (warehouses.isEmpty()) break;

                warehouseRepository.saveAll(warehouses);
                page++;
                Thread.sleep(1000);
            }
        System.out.println("Всього сторінок завантажено: " + page);
    }

    public List<WarehouseDto> search(String settlementRef) {
        return warehouseRepository.findAllBySettlementRef(settlementRef)
                .stream()
                .map(WarehouseMapper::toWarehouseResponse)
                .toList();
    }
}
