import { Product, ProductImage } from "@/entities/product/model";

export type ProductUploadImage = {
  description: string;
  file: File | null;
  serverImage: ProductImage | null;
};

export interface ProductFormValues extends Pick<
  Product,
  "title" | "description" | "specifications" | "benefits"
> {
  originalPrice: string | number;
  discountPercent: string | number;
  images: ProductUploadImage[];
  categoryIds: number[];
}
