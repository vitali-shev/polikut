import { fields } from "../model/fields";
import { ProductFormValues } from "../model/types";

export const buildFormData = (data: ProductFormValues) => {
  const formData = new FormData();
  const imagePositions: number[] = [];

  data.images.forEach((image, index) => {
    const file = image.file;
    if (file) {
      formData.append(fields.images.root, file);
      imagePositions.push(index);
    }
  });

  formData.append(
    "product",
    new Blob(
      [
        JSON.stringify({
          imagePositions,
          [fields.title]: data.title,
          [fields.description]: data.description,
          [fields.specifications.root]: data.specifications,
          [fields.benefits.root]: data.benefits,
          [fields.originalPrice]: data.originalPrice,
          [fields.discountPercent]: data.discountPercent || 0,
          [fields.categoryIds]: data.categoryIds,
        }),
      ],
      { type: "application/json" },
    ),
  );

  return formData;
};
