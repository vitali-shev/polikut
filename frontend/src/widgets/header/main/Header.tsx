import {
  AppBar,
  Badge,
  Button,
  Container,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BrandLogo from "@/shared/ui/BrandLogo";
import CartModal from "@/features/cart/ui";
import { useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { selectCartItems } from "@/features/cart/model/cartSlice";
import ContactPhoneWithIcon from "@/shared/ui/ContactPhoneWithIcon";
import { containerStyles } from "@/shared/ui/styles/container";
import HeaderProductSearch from "./HeaderProductSearch";

type ModalType = "cart" | "favorites";

export default function Header() {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const items = useAppSelector(selectCartItems);

  return (
    <>
      <AppBar elevation={0}>
        <Container maxWidth="xl" sx={containerStyles}>
          <Stack>
            <Toolbar
              disableGutters
              sx={{ justifyContent: "space-between", gap: 1 }}
            >
              <BrandLogo />
              <HeaderProductSearch
                sx={{ display: { xs: "none", md: "block" }, width: 600 }}
              />
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <ContactPhoneWithIcon />
                <Tooltip
                  arrow
                  title={
                    items.length === 0 && (
                      <Typography sx={{ textAlign: "center", fontSize: 13 }}>
                        <strong>Ваш кошик порожній</strong>
                        <br /> Додавайте в кошик товари, що сподобалися
                      </Typography>
                    )
                  }
                >
                  <Badge
                    badgeContent={items.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    )}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        top: { xs: 3, sm: 0 },
                        right: 2,
                      },
                    }}
                  >
                    <Button
                      onClick={() => setActiveModal("cart")}
                      variant="outlined"
                      color="inherit"
                      sx={{
                        minWidth: 42,
                        width: 42,
                        height: 42,
                        border: "2px solid",
                        borderRadius: 2,
                      }}
                    >
                      <ShoppingBagOutlinedIcon />
                    </Button>
                  </Badge>
                </Tooltip>
              </Stack>
            </Toolbar>
            <Toolbar
              disableGutters
              sx={{
                display: { xs: "block", md: "none" },
                minHeight: "48px !important",
              }}
            >
              <HeaderProductSearch sx={{ width: "100%" }} />
            </Toolbar>
          </Stack>
        </Container>
      </AppBar>
      <CartModal
        open={activeModal === "cart"}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
}
