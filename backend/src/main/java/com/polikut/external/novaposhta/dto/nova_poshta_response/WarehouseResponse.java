package com.polikut.external.novaposhta.dto.nova_poshta_response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record WarehouseResponse(

        @JsonProperty("Ref")
        String ref,

        @JsonProperty("Description")
        String description,

        @JsonProperty("SettlementRef")
        String settlementRef,

        @JsonProperty("CategoryOfWarehouse")
        String categoryOfWarehouse
) {
}
