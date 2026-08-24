package com.polikut.external.novaposhta.dto.nova_poshta_response;

import java.util.List;

public record NovaPoshtaResponse<T>(
        boolean success,
        List<T> data) {
}
