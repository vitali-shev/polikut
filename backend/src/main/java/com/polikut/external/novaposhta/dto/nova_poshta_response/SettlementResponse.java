package com.polikut.external.novaposhta.dto.nova_poshta_response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SettlementResponse(

        @JsonProperty("Ref")
        String ref,

        @JsonProperty("Description")
        String description,

        @JsonProperty("AreaDescription")
        String areaDescription,

        @JsonProperty("RegionsDescription")
        String regionsDescription
) {
}
