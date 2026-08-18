import ContactPhoneWithIcon from "@/shared/ui/ContactPhoneWithIcon";
import BrandLogo from "@/shared/ui/BrandLogo";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { containerStyles } from "@/shared/ui/styles/container";
import Container from "@mui/material/Container";

export default function Header() {
  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Container
          maxWidth="md"
          sx={[
            containerStyles,
            { display: "flex", justifyContent: "space-between" },
          ]}
        >
          <BrandLogo />
          <ContactPhoneWithIcon />
        </Container>
      </Toolbar>
    </AppBar>
  );
}
