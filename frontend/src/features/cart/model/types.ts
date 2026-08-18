import { Product } from "@/entities/product/model";

export interface CartItem extends Pick<
  Product,
  "id" | "title" | "sku" | "originalPrice" | "currentPrice"
> {
  thumbnailUrl: string;
  quantity: number;
}
