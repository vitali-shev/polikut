import {
  Box,
  Divider,
  Stack,
  Typography,
  Link as LinkMUI,
  IconButton,
  Container,
} from "@mui/material";
import mastercardLogo from "./assets/mastercard-logo.svg";
import visaLogo from "./assets/visa-logo.svg";
import bitcoinLogo from "./assets/bitcoin-logo.svg";
import instagramLogo from "./assets/instagram-logo.svg";
import tiktokLogo from "./assets/tiktok-logo.png";
import viberLogo from "./assets/viber-logo.svg";
import youtubeLogo from "./assets/youtube-logo.svg";
import telegramLogo from "./assets/telegram-logo.svg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
import { linkStyles } from "@/shared/ui/styles/link";
import BrandLogo from "@/shared/ui/BrandLogo";
import { containerStyles } from "@/shared/ui/styles/container";
import { routes } from "@/app/router/routes";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "rgb(232, 237, 243)", py: 2 }}>
      <Container maxWidth="xl" sx={containerStyles}>
        <Stack spacing={2} divider={<Divider />}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: { xs: "start", sm: "space-between" },
              gap: { xs: 1.5, sm: 1 },
              px: 0.2,
            }}
          >
            <BrandLogo disabled sx={{ width: { xs: "51%", sm: "auto" } }} />
            <Stack spacing={1}>
              <Typography
                sx={{ fontWeight: 500, width: { xs: "45%", sm: "auto" } }}
              >
                Клієнтам
              </Typography>
              <Typography component={Link} to={routes.DELIVERY} sx={linkStyles}>
                Доставка
              </Typography>
              <Typography component={Link} to={routes.PAYMENT} sx={linkStyles}>
                Оплата
              </Typography>
              <Typography
                component={Link}
                to={routes.RETURN_POLICY}
                sx={linkStyles}
              >
                Умови повернення
              </Typography>
            </Stack>
            <Stack spacing={1} sx={{ width: { xs: "50%", sm: "auto" } }}>
              <Typography sx={{ fontWeight: 500 }}>
                Зв'язатися з нами
              </Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <PhoneIcon />
                <LinkMUI href="tel:+380675651216" sx={linkStyles}>
                  067 565-12-16
                </LinkMUI>
              </Box>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <AccessTimeIcon />
                <Typography sx={{ fontSize: 15 }}>
                  пн - пт: 09:00 - 20:00
                  <br />
                  сб - нд: 09:00 - 18:00
                </Typography>
              </Box>
              <LinkMUI href="mailto:polikut.store@gmail.com" sx={linkStyles}>
                polikut.store@gmail.com
              </LinkMUI>
            </Stack>
            <Stack sx={{ width: { xs: "45%", sm: "auto" } }}>
              <Typography sx={{ fontWeight: 500 }}>
                Ми в соціальних мережах
              </Typography>
              <Box>
                <IconButton
                  disabled
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0.7 }}
                >
                  <Box component="img" src={instagramLogo} alt="Instagram" />
                </IconButton>
                <IconButton
                  disabled
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0.7 }}
                >
                  <Box component="img" src={telegramLogo} alt="Instagram" />
                </IconButton>
                <IconButton
                  disabled
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0.7 }}
                >
                  <Box component="img" src={viberLogo} alt="Instagram" />
                </IconButton>
                <IconButton
                  disabled
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0.7 }}
                >
                  <Box
                    component="img"
                    src={tiktokLogo}
                    alt="Tik Tok"
                    sx={{ width: 24 }}
                  />
                </IconButton>
                <IconButton
                  disabled
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0.7 }}
                >
                  <Box component="img" src={youtubeLogo} alt="Instagram" />
                </IconButton>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>
              © {new Date().getFullYear()} інтернет-магазин "Polikut"
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                component="img"
                src={mastercardLogo}
                sx={{ height: 32, bgcolor: "white", p: 0.2, borderRadius: 1 }}
              />
              <Box
                component="img"
                src={visaLogo}
                sx={{ height: 32, bgcolor: "white", p: 0.2, borderRadius: 1 }}
              />
              <Box
                component="img"
                src={bitcoinLogo}
                sx={{ height: 32, bgcolor: "white", p: 0.2, borderRadius: 1 }}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
