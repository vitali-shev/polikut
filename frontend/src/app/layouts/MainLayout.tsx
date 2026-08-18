import Header from "@/widgets/header/main";
import { Footer } from "@/widgets/footer";
import { Container, Stack, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { containerStyles } from "@/shared/ui/styles/container";

export default function Layout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Toolbar />
      <Toolbar
        sx={{
          display: { xs: "block", md: "none" },
          minHeight: "48px !important",
        }}
      />
      <Container
        component="main"
        maxWidth="xl"
        sx={[
          containerStyles,
          { display: "flex", flex: 1, mb: 2, mt: { xs: 1, sm: 2 } },
        ]}
      >
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  );
}
