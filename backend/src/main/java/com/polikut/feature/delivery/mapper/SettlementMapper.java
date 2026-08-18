package com.polikut.feature.delivery.mapper;

import com.polikut.feature.delivery.dto.SettlementDto;
import com.polikut.infrastructure.integration.novaposhta.dto.nova_poshta_response.SettlementResponse;
import com.polikut.feature.delivery.entity.Settlement;

public class SettlementMapper {

    public static Settlement toSettlement(SettlementResponse settlementResponse) {
        Settlement settlement = new Settlement();

        settlement.setRef(settlementResponse.ref());
        settlement.setDescription(settlementResponse.description());
        settlement.setRegionsDescription(settlementResponse.regionsDescription());
        settlement.setAreaDescription(settlementResponse.areaDescription());

        return settlement;
    }

    public static SettlementDto toSettlementResponse(Settlement settlement) {
        return new SettlementDto(settlement.getRef(),
                formatSettlement(settlement.getDescription(), settlement.getRegionsDescription(), settlement.getAreaDescription()));
    }

    private static String formatSettlement(String description,
                                           String regionsDescription,
                                           String areaDescription) {

        String region = (regionsDescription.isEmpty()) ? "" : String.format("%s р-н, ", regionsDescription);
        return String.format("%s (%s%s обл.)", description, region, areaDescription);
    }
}
