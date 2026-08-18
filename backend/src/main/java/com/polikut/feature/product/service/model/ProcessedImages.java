package com.polikut.feature.product.service.model;

import java.util.List;

public record ProcessedImages(byte[] thumbnail, List<byte[]> optimizedImages) {
}
