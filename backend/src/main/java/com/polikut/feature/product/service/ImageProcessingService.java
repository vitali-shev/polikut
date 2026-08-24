package com.polikut.feature.product.service;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class ImageProcessingService {

    public byte[] toOptimizedImage(MultipartFile file) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();

        Thumbnails.of(file.getInputStream())
                .size(800, 800)
                .outputFormat("webp")
                .outputQuality(0.8f)
                .crop(Positions.CENTER)
                .toOutputStream(output);

        return output.toByteArray();
    }

    public byte[] toThumbnail(MultipartFile file) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();

        Thumbnails.of(file.getInputStream())
                .size(400, 400)
                .outputFormat("webp")
                .outputQuality(0.8f)
                .crop(Positions.CENTER)
                .toOutputStream(output);

        return output.toByteArray();
    }
}
