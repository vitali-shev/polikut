import { containerStyles } from "@/shared/ui/styles/container";
import Header from "@/widgets/header/checkout";
import { Container, Toolbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";

export default function CheckoutLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Toolbar />
      <Container
        component="main"
        maxWidth="md"
        sx={[
          containerStyles,
          {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            mb: 2,
            mt: { xs: 1, sm: 2 },
          },
        ]}
      >
        <Outlet />
      </Container>
    </Stack>
  );
}
