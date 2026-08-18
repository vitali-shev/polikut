import { ProductImage } from "@/entities/product/model";
import { fields } from "./fields";
import { ProductFormValues, ProductUploadImage } from "./types";

export const initImageUploadSlots = (
  serverImages: ProductImage[] = [],
): ProductUploadImage[] =>
  Array.from({ length: 5 }).map((_, i) => ({
    description: i === 0 ? "Основне зображення" : `Зображення ${i + 1}`,
    file: null,
    serverImage: serverImages.find((img) => img.position === i) ?? null,
  }));

export const initialValues: ProductFormValues = {
  [fields.title]: "",
  [fields.specifications.root]: [],
  [fields.benefits.root]: [],
  [fields.originalPrice]: "",
  [fields.discountPercent]: "",
  [fields.description]: "",
  [fields.images.root]: initImageUploadSlots(),
  [fields.categoryIds]: [],
};
