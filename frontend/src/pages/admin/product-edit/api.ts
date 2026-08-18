import { productApi } from "@/entities/product/api";
import { buildFormData } from "@/features/product/lib/buildFormData";
import { ProductFormValues } from "@/features/product/model/types";

type ProductUpdateRequest = ProductFormValues & { id: number };

export const updateProductApi = productApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProduct: builder.mutation<void, ProductUpdateRequest>({
      query: ({ id, ...data }) => ({
        url: `/admin/products/${id}`,
        method: "PUT",
        body: buildFormData(data),
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const undoUpdate = dispatch(
          productApi.util.updateQueryData(
            "getProductOptions",
            undefined,
            (draft) => {
              const productOption = draft.find((item) => item.id === arg.id);
              if (productOption) {
                productOption.title = arg.title;
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          undoUpdate.undo();
        }
      },
    }),
  }),
});

export const { useUpdateProductMutation } = updateProductApi;
