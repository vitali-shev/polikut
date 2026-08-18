import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      const csrfToken = Cookies.get("XSRF-TOKEN");

      if (csrfToken) {
        headers.set("X-XSRF-TOKEN", csrfToken);
      }
    },
  }),
  //tagTypes: ["Products"],
  endpoints: () => ({}),
});
