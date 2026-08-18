import { baseApi } from "@/shared/api/baseApi";
import {
  ProductOption,
  ProductCard,
  ProductQueryParams,
  Page,
  Product,
  ProductForAdminResponse,
} from "../model";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductDetails: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),

    getProductCards: builder.query<Page<ProductCard>, ProductQueryParams>({
      query: (params) => ({
        url: "/products",
        params,
      }),
    }),

    getProductOptions: builder.query<ProductOption[], void>({
      query: () => "/products/options",
    }),

    getProductForAdmin: builder.query<ProductForAdminResponse, number>({
      query: (id) => `/admin/products/${id}`,
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const undoDelete = dispatch(
          productApi.util.updateQueryData(
            "getProductOptions",
            undefined,
            (draft) => {
              const index = draft.findIndex((item) => item.id === arg);
              if (index !== -1) {
                draft.splice(index, 1);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          undoDelete.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProductDetailsQuery,
  useGetProductCardsQuery,
  useGetProductOptionsQuery,
  useLazyGetProductForAdminQuery,
  useDeleteProductMutation,
} = productApi;
