import { baseApi } from "@/shared/api/baseApi";
import { CallbackRequest } from "./types";

export const callbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendCallback: builder.mutation<void, CallbackRequest>({
      query: (body) => ({
        url: "/callbacks",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendCallbackMutation } = callbackApi;
