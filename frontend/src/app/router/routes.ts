import { PRODUCT_PARAMS } from "@/entities/product/model/constants/params";
import { PRODUCT_SORT_OPTIONS } from "@/entities/product/model/constants/sortOptions";

const ADMIN_ROOT = "/admin";

export const routes = {
  ADMIN: {
    ROOT: ADMIN_ROOT,
    CATEGORIES: {
      segment: "categories",
      path: `${ADMIN_ROOT}/categories`,
    },
    PRODUCTS: {
      segment: "products",
      CREATE: {
        segment: "create",
        path: `${ADMIN_ROOT}/products/create`,
      },
      EDIT: {
        segment: "edit",
        path: `${ADMIN_ROOT}/products/edit`,
      },
      DELETE: {
        segment: "delete",
        path: `${ADMIN_ROOT}/products/delete`,
      },
    },
    ORDERS: {
      segment: "orders",
      path: `${ADMIN_ROOT}/orders`,
      DETAILS: {
        segment: ":id",
        getPath: (id: number) => `${ADMIN_ROOT}/orders/${id}`,
      },
    },
  },

  HOME: "/",

  PRODUCTS: {
    path: "/products",
    DETAILS: {
      segment: ":id",
      getPath: (id: number) => `/products/${id}`,
    },
    byCategory: (categoryId: number) =>
      `/products?${PRODUCT_PARAMS.categoryId}=${categoryId}`,
    discount: () => `/products?${PRODUCT_PARAMS.discount}=true`,
    newest: () =>
      `/products?${PRODUCT_PARAMS.sort}=${PRODUCT_SORT_OPTIONS.NEWEST}`,
  },

  CHECKOUT: {
    path: "/checkout",
    SUCCESS: {
      segment: "success/:id",
      getPath: (id: number) => `/checkout/success/${id}`,
    },
  },

  DELIVERY: "/delivery",
  PAYMENT: "/payment",
  RETURN_POLICY: "/return-policy",
} as const;
