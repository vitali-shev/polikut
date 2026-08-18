import { baseApi } from "@/shared/api/baseApi";
import { Category } from "../model/types";
import { CategoryCreateRequest, CategoryUpdateRequest } from "../model/types";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),

    createCategory: builder.mutation<Category, CategoryCreateRequest>({
      query: (body) => ({
        url: "/admin/categories",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newCategory } = await queryFulfilled;

          dispatch(
            categoryApi.util.updateQueryData(
              "getCategories",
              undefined,
              (draft) => {
                draft.push(newCategory);
              },
            ),
          );
        } catch {}
      },
    }),

    updateCategory: builder.mutation<Category, CategoryUpdateRequest>({
      query: ({ id, icon, name }) => ({
        url: `/admin/categories/${id}`,
        method: "PUT",
        body: { icon, name },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const undoUpdate = dispatch(
          categoryApi.util.updateQueryData(
            "getCategories",
            undefined,
            (draft) => {
              const category = draft.find((item) => item.id === arg.id);
              if (category) {
                Object.assign(category, {
                  name: arg.name,
                  icon: arg.icon,
                });
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

    deleteCategory: builder.mutation<Category, number>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const undoDelete = dispatch(
          categoryApi.util.updateQueryData(
            "getCategories",
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
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
