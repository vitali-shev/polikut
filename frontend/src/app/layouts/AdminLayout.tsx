import Header from "@/widgets/header/admin";
import { Container, Stack, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "./AdminNavigation";
import { containerStyles } from "@/shared/ui/styles/container";

export default function Layout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Toolbar />
      <Container
        component="main"
        maxWidth="lg"
        sx={[containerStyles, { my: 2 }]}
      >
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
          <Navigation />
          <Outlet />
        </Stack>
      </Container>
    </Stack>
  );
}
