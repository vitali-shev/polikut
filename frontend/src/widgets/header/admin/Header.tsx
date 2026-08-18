import { AppBar, Container, Toolbar } from "@mui/material";
import BrandLogo from "@/shared/ui/BrandLogo";
import { containerStyles } from "@/shared/ui/styles/container";
import LogoutButton from "@/features/auth/LogoutButton";

export default function Header() {
  return (
    <>
      <AppBar elevation={0}>
        <Container maxWidth="lg" sx={containerStyles}>
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", gap: 1 }}
          >
            <BrandLogo />
            <LogoutButton name="Вихід" />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
