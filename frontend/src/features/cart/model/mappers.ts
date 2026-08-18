import { ProductCard } from "@/entities/product/model";
import { CartItem } from "./types";

export const createCartItem = (
  product: ProductCard,
  quantity = 1,
): CartItem => ({
  id: product.id,
  sku: product.sku,
  title: product.title,
  originalPrice: product.originalPrice,
  currentPrice: product.currentPrice,
  thumbnailUrl: product.thumbnailUrl,
  quantity,
});
