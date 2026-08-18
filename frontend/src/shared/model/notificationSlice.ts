import { createAppSlice } from "@/app/store/createAppSlice";
import { AlertColor } from "@mui/material";
import { PayloadAction } from "@reduxjs/toolkit/react";
import { v4 as uuid } from "uuid";

type NotificationState = {
  open: boolean;
  message: string | null;
  severity: AlertColor;
  id: string | null;
};

const initialState: NotificationState = {
  open: false,
  message: null,
  severity: "info",
  id: null,
};

export const notificationSlice = createAppSlice({
  name: "notification",
  initialState,
  reducers: (create) => ({
    showNotification: create.reducer(
      (
        state,
        action: PayloadAction<{
          message: string;
          severity: NotificationState["severity"];
        }>,
      ) => {
        state.open = true;
        state.message = action.payload.message;
        state.severity = action.payload.severity;
        state.id = uuid();
      },
    ),
    hideNotification: create.reducer((state) => {
      state.open = false;
    }),
  }),
  selectors: {
    selectNotification: (state) => state,
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const { selectNotification } = notificationSlice.selectors;
