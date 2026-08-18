import { baseApi } from "@/shared/api/baseApi";
import {
  OrderCardResponse,
  Order,
  OrderCreateRequest,
  OrderUpdateRequest,
  Settlement,
  Warehouse,
} from "../model";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchSettlements: builder.query<Settlement[], string>({
      query: (search: string) => ({
        url: "/settlements",
        params: { search },
      }),
    }),

    searchWarehouses: builder.query<Warehouse[], string>({
      query: (settlementRef: string) => ({
        url: "/warehouses",
        params: { settlementRef },
      }),
    }),

    createOrder: builder.mutation<Order, OrderCreateRequest>({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
    }),

    getOrderCards: builder.query<OrderCardResponse[], void>({
      query: () => "/admin/orders",
    }),

    getOrderDetails: builder.query<Order, number>({
      query: (id) => `/admin/orders/${id}`,
    }),

    deleteOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/orders/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const deleteCard = dispatch(
          orderApi.util.updateQueryData("getOrderCards", undefined, (draft) => {
            const index = draft.findIndex((item) => item.id === arg);

            if (index !== -1) {
              draft.splice(index, 1);
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          deleteCard.undo();
        }
      },
    }),

    updateOrder: builder.mutation<void, OrderUpdateRequest & { id: number }>({
      query: ({ id, ...body }) => ({
        url: `/admin/orders/${id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const updateCard = dispatch(
          //patchQueryData
          orderApi.util.updateQueryData("getOrderCards", undefined, (draft) => {
            const orderCard = draft.find((item) => item.id === arg.id);
            if (orderCard) {
              if (arg.orderStatus !== undefined)
                orderCard.orderStatus = arg.orderStatus;
              if (arg.paymentStatus !== undefined)
                orderCard.paymentStatus = arg.paymentStatus;
              if (arg.paymentMethod !== undefined)
                orderCard.paymentMethod = arg.paymentMethod;
            }
          }),
        );
        const updateDetails = dispatch(
          orderApi.util.updateQueryData("getOrderDetails", arg.id, (draft) => {
            if (arg.orderStatus !== undefined)
              draft.orderStatus = arg.orderStatus;
            if (arg.paymentStatus !== undefined)
              draft.paymentStatus = arg.paymentStatus;
            if (arg.paymentMethod !== undefined)
              draft.paymentMethod = arg.paymentMethod;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          updateCard.undo();
          updateDetails.undo();
        }
      },
    }),
  }),
});

export const {
  useSearchSettlementsQuery,
  useSearchWarehousesQuery,
  useCreateOrderMutation,
  useGetOrderCardsQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
