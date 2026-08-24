package com.polikut.feature.product.service;

import com.polikut.feature.category.entity.Category;
import com.polikut.feature.category.repository.CategoryRepository;
import com.polikut.feature.product.dto.request.ProductUpsertRequest;
import com.polikut.feature.product.dto.response.ProductOptionResponse;
import com.polikut.feature.product.service.model.ProcessedImages;
import com.polikut.feature.product.dto.response.ProductForAdminResponse;
import com.polikut.feature.product.entity.Product;
import com.polikut.feature.product.entity.ProductImage;
import com.polikut.feature.product.enums.ImageFolder;
import com.polikut.feature.product.exception.ImageOrderMismatchException;
import com.polikut.feature.product.exception.ProductTitleDuplicateException;
import com.polikut.feature.product.exception.ProductNotFoundException;
import com.polikut.feature.product.exception.UnsupportedImageFormatException;
import com.polikut.feature.product.mapper.ProductMapper;
import com.polikut.feature.product.repository.ProductRepository;
import com.polikut.external.firebase.FirebaseStorageService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductAdminService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ImageProcessingService imageProcessingService;
    private final FirebaseStorageService firebaseStorageService;
    private final ProductMapper productMapper;

    public ProductAdminService(ProductRepository productRepository,
                               CategoryRepository categoryRepository,
                               ImageProcessingService imageProcessingService,
                               FirebaseStorageService firebaseStorageService,
                               ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.imageProcessingService = imageProcessingService;
        this.firebaseStorageService = firebaseStorageService;
        this.productMapper = productMapper;
    }

    public ProductForAdminResponse get(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        return productMapper.toProductForAdminResponse(product);
    }

    @Transactional
    public ProductOptionResponse create(ProductUpsertRequest product, List<MultipartFile> images) {
        boolean hasImages = images != null && product.imagePositions() != null;

        if (hasImages && images.size() != product.imagePositions().size()) {
            throw new ImageOrderMismatchException();
        }

        // Перевірка унікальності назви при додаванні.
        String productTitle = product.title();
        if (productRepository.existsByTitle(productTitle)) {
            throw new ProductTitleDuplicateException(productTitle);
        }

        // Якщо ImageOrderMismatchException не вилетів, отже, списки null або валідні.
        // Гарантується, що розміри обох списків збігаються.
        int imagesCount = hasImages ? images.size() : 0;

        // Кидає UnsupportedImageFormatException.
        ProcessedImages processedImages = processImages(product.imagePositions(), images, imagesCount);

        int discountPercent = product.discountPercent() == null ? 0 : product.discountPercent();

        Product productToCreate = new Product();
        productToCreate.setTitle(productTitle);
        productToCreate.setDescription(product.description());
        productToCreate.setSpecifications(product.specifications());
        productToCreate.setBenefits(product.benefits());
        productToCreate.setOriginalPrice(product.originalPrice());
        productToCreate.setDiscountPercent(discountPercent);
        productToCreate.setCurrentPrice((int) Math.round(product.originalPrice() * (1 - discountPercent / 100.0)));
        productToCreate = productRepository.save(productToCreate);


        // Завантажити thumbnail, якщо він наданий.
        if (processedImages.thumbnail() != null) {
            String thumbnailPath = buildPath(productToCreate.getId(), ImageFolder.THUMBNAIL);
            firebaseStorageService.upload(processedImages.thumbnail(), thumbnailPath, "image/webp");
            productToCreate.setThumbnailPath(thumbnailPath);
        }

        // Завантажити всі надані зображення.
        if (!processedImages.optimizedImages().isEmpty()) {
            List<ProductImage> productImages = new ArrayList<>();
            for (int i = 0; i < imagesCount; i++) {
                String storagePath = buildPath(productToCreate.getId(), ImageFolder.IMAGES);
                int position = product.imagePositions().get(i);
                byte[] optimizedImage = processedImages.optimizedImages().get(i);

                firebaseStorageService.upload(optimizedImage, storagePath, "image/webp");
                productImages.add(new ProductImage(position, storagePath));
            }
            productToCreate.setImages(productImages);
        }

        String sku = String.format("%06d", productToCreate.getId());
        productToCreate.setSku(sku);

        List<Category> categories = categoryRepository.findAllById(product.categoryIds());
        productToCreate.setCategories(categories);

        return new ProductOptionResponse(productToCreate.getId(), productToCreate.getTitle());
    }

    @Transactional
    public void update(Long id, ProductUpsertRequest product, List<MultipartFile> images) {
        boolean hasImages = images != null && product.imagePositions() != null;

        if (hasImages && images.size() != product.imagePositions().size()) {
            throw new ImageOrderMismatchException();
        }

        Product productToUpdate = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        // Перевірка унікальності назви при оновленні.
        String oldTitle = productToUpdate.getTitle();
        String newTitle = product.title();
        if (!oldTitle.equals(newTitle)) {
            if (productRepository.existsByTitle(newTitle)) {
                throw new ProductTitleDuplicateException(newTitle);
            }
            productToUpdate.setTitle(newTitle);
        }

        // Якщо ImageOrderMismatchException не вилетів, отже, списки null або валідні.
        // Гарантується, що розміри обох списків збігаються.
        int imagesCount = hasImages ? images.size() : 0;

        // Кидає UnsupportedImageFormatException.
        ProcessedImages processedImages = processImages(product.imagePositions(), images, imagesCount);

        // Завантажити thumbnail, якщо він наданий.
        if (processedImages.thumbnail() != null) {
            String thumbnailPath = productToUpdate.getThumbnailPath();
            // Якщо продукт не мав thumbnail раніше, то згенерувати новий path.
            if (thumbnailPath == null) {
                thumbnailPath = buildPath(productToUpdate.getId(), ImageFolder.THUMBNAIL);
            }
            firebaseStorageService.upload(processedImages.thumbnail(), thumbnailPath, "image/webp");
            productToUpdate.setThumbnailPath(thumbnailPath);
        }

        List<ProductImage> productImages = productToUpdate.getImages();
        // Індексація старих зображень за їхньою позицією.
        Map<Integer, String> existingImagesMap = productImages
                .stream()
                .collect(Collectors.toMap(ProductImage::position, ProductImage::path));

        // Синхронізація зображень товару зі сховищем.
        for (int i = 0; i < imagesCount; i++) {
            int position = product.imagePositions().get(i);
            byte[] optimizedImage = processedImages.optimizedImages().get(i);

            String existingImagePath = existingImagesMap.get(position);
            if (existingImagePath != null) {
                // Перезаписати вміст наявного зображення.
                firebaseStorageService.upload(optimizedImage, existingImagePath, "image/webp");
            } else {
                // Завантажити як нове зображення та прив'язати до товару.
                String imagePath = buildPath(productToUpdate.getId(), ImageFolder.IMAGES);
                firebaseStorageService.upload(optimizedImage, imagePath, "image/webp");
                productImages.add(new ProductImage(position, imagePath));
            }
        }

        int discountPercent = product.discountPercent() == null ? 0 : product.discountPercent();

        productToUpdate.setDescription(product.description());
        productToUpdate.setSpecifications(product.specifications());
        productToUpdate.setBenefits(product.benefits());
        productToUpdate.setOriginalPrice(product.originalPrice());
        productToUpdate.setDiscountPercent(discountPercent);
        productToUpdate.setCurrentPrice((int) Math.round(productToUpdate.getOriginalPrice() * (1 - discountPercent / 100.0)));
        List<Category> categories = categoryRepository.findAllById(product.categoryIds());
        productToUpdate.setCategories(categories);
    }

    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        String thumbnail = product.getThumbnailPath();
        if (thumbnail != null) {
            firebaseStorageService.delete(product.getThumbnailPath());
        }

        for (ProductImage image : product.getImages()) {
            firebaseStorageService.delete(image.path());
        }

        productRepository.delete(product);
    }

    private ProcessedImages processImages(List<Integer> imageOrder, List<MultipartFile> images, int imagesCount) {
        byte[] thumbnail = null;
        List<byte[]> optimizedImages = new ArrayList<>();

        // Якщо отримано хоча б одне зображення, запустити процес стиснення.
        if (imagesCount > 0) {
            int firstImagePosition = imageOrder.getFirst();
            try {
                // Оновити thumbnail, якщо перше зображення має нульову позицію.
                if (firstImagePosition == 0) {
                    thumbnail = imageProcessingService.toThumbnail(images.getFirst());
                }
                for (MultipartFile file : images) {
                    byte[] optimizedImage = imageProcessingService.toOptimizedImage(file);
                    optimizedImages.add(optimizedImage);
                }
            } catch (IOException e) {
                throw new UnsupportedImageFormatException();
            }
        }
        return new ProcessedImages(thumbnail, optimizedImages);
    }

    private static String buildPath(Long id, ImageFolder folder) {
        String uniqueName = UUID.randomUUID().toString();
        return String.format(
                "products/%d/%s/%s.webp",
                id,
                folder.getFolderName(),
                uniqueName);
    }
}
