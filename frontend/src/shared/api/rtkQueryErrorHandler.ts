import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { showNotification } from "@/shared/model/notificationSlice";
import { ErrorResponse } from "./types";

export const rtkQueryErrorHandler: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const message =
        action.payload &&
        typeof action.payload === "object" &&
        "data" in action.payload &&
        action.payload.data != null
          ? (action.payload.data as ErrorResponse).message
          : "Сталася помилка. Будь ласка, спробуйте пізніше";

      next(showNotification({ message, severity: "error" }));
    }

    return next(action);
  };
