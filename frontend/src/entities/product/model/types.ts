export type ProductSpec = {
  name: string;
  value: string;
};

export type ProductImage = {
  position: number;
  url: string;
};

export interface Product {
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  specifications: ProductSpec[];
  benefits: string[];
  originalPrice: number;
  discountPercent: number;
  currentPrice: number;
  isNew: boolean;
  sku: string;
  images: ProductImage[];
}

export interface ProductForAdminResponse extends Omit<
  Product,
  "thumbnailUrl" | "currentPrice" | "isNew" | "sku"
> {
  categoryIds: number[];
}

export type ProductOption = Pick<Product, "id" | "title">;

export interface ProductCard extends Pick<
  Product,
  | "id"
  | "title"
  | "originalPrice"
  | "discountPercent"
  | "currentPrice"
  | "isNew"
  | "sku"
  | "thumbnailUrl"
> {}

export type ProductQueryParams = {
  page: number;
  size: number;
  categoryId?: number;
  discount?: boolean;
  sort?: string;
  createdAfter?: string;
};

export interface Page<T> {
  content: T[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
