package com.polikut.infrastructure.integration.firebase;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import org.springframework.stereotype.Service;

@Service
public class FirebaseStorageService {

    private final Storage storage;
    private final FirebaseProperties firebaseProperties;

    public FirebaseStorageService(Storage storage, FirebaseProperties firebaseProperties) {
        this.storage = storage;
        this.firebaseProperties = firebaseProperties;
    }

    public void upload(byte[] data, String path, String contentType) {
        BlobId blobId = BlobId.of(firebaseProperties.bucketName(), path);

        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(contentType)
                .build();

        storage.create(blobInfo, data);
    }

    public void delete(String path) {
        BlobId blobId = BlobId.of(firebaseProperties.bucketName(), path);

        storage.delete(blobId);
    }

    public String buildUrl(String path) {
        String encodedPath = path.replace("/", "%2F");
        return String.format("%s/v0/b/%s/o/%s?alt=media",
                firebaseProperties.baseUrl(),
                firebaseProperties.bucketName(),
                encodedPath);
    }
}
