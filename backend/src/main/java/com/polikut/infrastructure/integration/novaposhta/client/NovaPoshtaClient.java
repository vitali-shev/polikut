package com.polikut.infrastructure.integration.novaposhta.client;

import com.polikut.infrastructure.integration.novaposhta.dto.nova_poshta_request.NovaPoshtaRequest;
import com.polikut.infrastructure.integration.novaposhta.dto.nova_poshta_response.NovaPoshtaResponse;
import com.polikut.infrastructure.integration.novaposhta.dto.nova_poshta_response.SettlementResponse;
import com.polikut.infrastructure.integration.novaposhta.dto.nova_poshta_response.WarehouseResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class NovaPoshtaClient {

    private final RestClient restClient;
    private final String apiKey;
    private final String baseUrl;

    public NovaPoshtaClient(RestClient restClient,
                            @Value("${nova-poshta.api-key}") String apiKey,
                            @Value("${nova-poshta.base-url}") String baseUrl) {
        this.restClient = restClient;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    public List<SettlementResponse> getSettlements(int page) {
        NovaPoshtaResponse<SettlementResponse> response =
                restClient.post()
                        .uri(baseUrl)
                        .body(createRequest("Address", "getSettlements",
                                Map.of("Page", page)))
                        .retrieve()
                        .body(new ParameterizedTypeReference<>() {});

        return (response != null && response.success()) ? response.data() : List.of();
    }

    public List<WarehouseResponse> getWarehouses(int page) {
        NovaPoshtaResponse<WarehouseResponse> response =
                restClient.post()
                        .uri(baseUrl)
                        .body(createRequest("AddressGeneral", "getWarehouses",
                                Map.of("Page", page)))
                        .retrieve()
                        .body(new ParameterizedTypeReference<>() {});

        return (response != null && response.success() ? response.data() : List.of());
    }

    private <T> NovaPoshtaRequest<T> createRequest(String modelName, String calledMethod, T methodProperties) {
        return new NovaPoshtaRequest<>(apiKey, modelName, calledMethod, methodProperties);
    }
}
