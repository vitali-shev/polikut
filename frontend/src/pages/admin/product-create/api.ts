import { productApi } from "@/entities/product/api";
import { ProductOption } from "@/entities/product/model";
import { buildFormData } from "@/features/product/lib/buildFormData";
import { ProductFormValues } from "@/features/product/model/types";

export const createProductApi = productApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<ProductOption, ProductFormValues>({
      query: (data) => ({
        url: "/admin/products",
        method: "POST",
        body: buildFormData(data),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newProductOption } = await queryFulfilled;

          dispatch(
            productApi.util.updateQueryData(
              "getProductOptions",
              undefined,
              (draft) => {
                draft.push(newProductOption);
              },
            ),
          );
        } catch {}
      },
    }),
  }),
});

export const { useCreateProductMutation } = createProductApi;
