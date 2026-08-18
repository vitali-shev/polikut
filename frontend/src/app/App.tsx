import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import GlobalNotification from "@/shared/ui/GlobalNotification";
import { useAuthStatusQuery } from "@/features/auth/authApi";

export default function App() {
  useAuthStatusQuery();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalNotification />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
