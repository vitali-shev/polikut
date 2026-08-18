import { createAppSlice } from "@/app/store/createAppSlice";
import { AuthState } from "./types";

const initialState: AuthState = {
  authenticated: undefined,
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState: initialState,
  reducers: (create) => ({
    login: create.reducer((state) => {
      state.authenticated = true;
    }),
    logout: create.reducer((state) => {
      state.authenticated = false;
    }),
  }),
  selectors: {
    loggedIn: (state) => state.authenticated,
  },
});

export const { login, logout } = authSlice.actions;
export const { loggedIn } = authSlice.selectors;
