package com.polikut.feature.delivery.service;

import com.polikut.feature.delivery.dto.SettlementDto;
import com.polikut.feature.delivery.entity.Settlement;
import com.polikut.feature.delivery.mapper.SettlementMapper;
import com.polikut.feature.delivery.repository.SettlementRepository;
import com.polikut.infrastructure.integration.novaposhta.client.NovaPoshtaClient;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettlementService {

    private final NovaPoshtaClient novaPoshtaClient;
    private final SettlementRepository settlementRepository;

    public SettlementService(NovaPoshtaClient novaPoshtaClient, SettlementRepository settlementRepository) {
        this.novaPoshtaClient = novaPoshtaClient;
        this.settlementRepository = settlementRepository;
    }

    @Transactional
    @Scheduled(cron = "0 50 22 * * SAT")
    public void syncSettlements() {
        int page = 1;
        settlementRepository.deleteAllInBatch();

        while (true) {
            List<Settlement> settlements =
                    novaPoshtaClient.getSettlements(page)
                            .stream()
                            .map(SettlementMapper::toSettlement)
                            .toList();

            if (settlements.isEmpty()) break;

            settlementRepository.saveAll(settlements);
            page++;
        }
        System.out.println("Всього сторінок завантажено: " + page);
    }

    public List<SettlementDto> search(String search) {
        return settlementRepository.findAllByDescriptionContainingIgnoreCase(search)
                .stream()
                .map(SettlementMapper::toSettlementResponse)
                .toList();
    }
}
