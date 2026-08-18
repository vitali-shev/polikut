package com.polikut.infrastructure.integration.novaposhta.dto.nova_poshta_request;

public record NovaPoshtaRequest<T>(
        String apiKey,
        String modelName,
        String calledMethod,
        T methodProperties) {
}
