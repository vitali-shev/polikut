import { baseApi } from "@/shared/api/baseApi";
import { login, logout } from "./authSlice";
import { AuthResponse, LoginRequest } from "./types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    authStatus: builder.query<AuthResponse, void>({
      query: () => "/auth/status",
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          data.authenticated ? dispatch(login()) : dispatch(logout());
        } catch (e) {}
      },
    }),

    login: builder.mutation<void, LoginRequest>({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: new URLSearchParams({
          username,
          password,
        }),
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(login());
        } catch (e) {}
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useAuthStatusQuery, useLoginMutation, useLogoutMutation } =
  authApi;
