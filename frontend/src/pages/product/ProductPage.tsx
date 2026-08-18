import { useGetProductDetailsQuery } from "@/entities/product/api";
import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAppDispatch } from "@/app/store/hooks";
import { showNotification } from "@/shared/model/notificationSlice";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import novaPoshta from "./assets/nova-poshta.svg";
import ukrposhta from "./assets/ukrposhta.png";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { ProductBadges } from "@/entities/product/ui";
import InfoTooltip from "@/shared/ui/InfoTooltip";
import SliderPrevButton from "@/shared/ui/SliderPrevButton";
import SliderNextButton from "@/shared/ui/SliderNextButton";
import { cardStyles } from "@/shared/ui/styles/card";
import { mainButtonStyles } from "@/shared/ui/styles/button";
import { originalPriceStyle } from "@/entities/product/ui/styles";
import { addToCart } from "@/features/cart/model/cartSlice";
import { truncateText } from "@/shared/lib/truncateText";
import { createCartItem } from "@/features/cart/model/mappers";
import CallbackModal from "@/features/callback/CallbackModal";
import ProductSeo from "./ProductSeo";
import ProductSchema from "./ProductSchema";

export default function ProductPage() {
  const { id } = useParams();
  const { data: product } = useGetProductDetailsQuery(Number(id));
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const dispatch = useAppDispatch();

  const [isCallbackModalOpen, setIsCallbackModalOpen] =
    useState<boolean>(false);

  if (!product) return null;

  const handlePrev = () => {
    const images = product.images;
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    const images = product.images;
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCopySku = () => {
    navigator.clipboard.writeText(product.sku);
    dispatch(
      showNotification({
        message: "Код товару скопійовано",
        severity: "success",
      }),
    );
  };

  return (
    <>
      <ProductSeo product={product} />
      <ProductSchema product={product} />
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          width: "100%",
        }}
      >
        <Card
          sx={[
            cardStyles,
            {
              width: { xs: "100%", sm: "65%", md: "45%", lg: "38%" },
              overflow: "hidden",
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              alignSelf: { xs: "center", md: "start" },
            },
          ]}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={product.images[currentImageIndex].url}
              alt={product.title}
              sx={{ width: "100%", display: "block" }}
            />
            <ProductBadges
              discountPercent={product.discountPercent}
              isNew={product.isNew}
              sx={{ position: "absolute", gap: 0.4, top: 4, left: 4 }}
            />
            {product.discountPercent > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  color: "white",
                  bgcolor: "rgb(255, 51, 0)",
                  px: 1,
                  borderRadius: 2,
                  fontWeight: "bold",
                }}
              >
                -{product.discountPercent} %
              </Box>
            )}
            <SliderPrevButton onClick={handlePrev} />
            <SliderNextButton onClick={handleNext} />
          </Box>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              py: 2,
              gap: 0.5,
            }}
          >
            {product.images.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image.url}
                onClick={() => setCurrentImageIndex(index)}
                sx={{
                  width: 60,
                  border:
                    index === currentImageIndex ? "2px solid" : "1px solid",
                  borderColor:
                    index === currentImageIndex
                      ? "primary.main"
                      : "rgb(175, 175, 175)",
                  borderRadius: 1,
                  cursor: "pointer",
                  "&:hover": {
                    filter: "brightness(0.85)",
                  },
                }}
              />
            ))}
          </Stack>
        </Card>
        <Stack sx={{ width: { xs: "100%", md: "55%", lg: "62%" }, gap: 2 }}>
          <Card variant="outlined" sx={cardStyles}>
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {product.title}
              </Typography>
              <Typography sx={{ textIndent: 24 }}>
                {product.description}
              </Typography>
              <Typography sx={{ textAlign: "end" }}>
                Код:{" "}
                <Box component="span" sx={{ fontWeight: 600 }}>
                  {product.sku}{" "}
                </Box>
                <ContentCopyIcon
                  onClick={handleCopySku}
                  fontSize="small"
                  color="action"
                  sx={{ cursor: "pointer" }}
                />
              </Typography>
            </Stack>
          </Card>
          <Card
            variant="outlined"
            sx={[
              cardStyles,
              {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              },
            ]}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: "end" }}>
              {product.discountPercent > 0 && (
                <Typography sx={originalPriceStyle}>
                  {product.originalPrice.toLocaleString("uk-UA")} грн.
                </Typography>
              )}
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                {product.currentPrice.toLocaleString("uk-UA")} грн.
              </Typography>
            </Stack>
            <Stack
              sx={{
                mt: "auto",
                ml: "auto",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Button
                onClick={() => setIsCallbackModalOpen(true)}
                variant="outlined"
                startIcon={<DirectionsRunOutlinedIcon />}
                sx={mainButtonStyles}
              >
                Швидка покупка
              </Button>
              <Button
                variant="contained"
                startIcon={<ShoppingBagOutlinedIcon />}
                sx={mainButtonStyles}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addToCart(createCartItem(product)));
                  dispatch(
                    showNotification({
                      message: `"${truncateText(product.title, 40)}" додано до кошика`,
                      severity: "success",
                    }),
                  );
                }}
              >
                У кошик
              </Button>
            </Stack>
          </Card>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            // sx={{ alignItems: { lg: "flex-start" } }}
          >
            <Card
              sx={[
                cardStyles,
                {
                  flex: { lg: 1 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                },
              ]}
            >
              <Typography sx={{ fontWeight: 700 }}>Ключові переваги</Typography>
              <Stack>
                {product.benefits.map((benefit, index) => (
                  <Typography key={index} sx={{ py: "2px" }}>
                    - {benefit};
                  </Typography>
                ))}
              </Stack>
            </Card>
            <Card
              sx={[
                cardStyles,
                {
                  flex: { lg: 1 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                },
              ]}
            >
              <Typography sx={{ fontWeight: 700 }}>
                Технічні характеристики
              </Typography>
              <Stack sx={{ mx: -2 }}>
                {product.specifications.map((spec, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={1}
                    sx={{
                      py: "2px",
                      alignItems: "center",
                      bgcolor: index % 2 === 0 ? "none" : "rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    <Typography sx={{ flex: 1, px: 2 }}>{spec.name}</Typography>
                    <Typography sx={{ flex: 1.2, px: 2 }}>
                      {spec.value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Stack>
          <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
            <Card
              variant="outlined"
              sx={[
                cardStyles,
                {
                  display: "flex",
                  flex: { lg: 2 },
                  flexDirection: "column",
                  gap: 2,
                },
              ]}
            >
              <Stack
                sx={{ flexDirection: "row", gap: 0.5, alignItems: "center" }}
              >
                <LocationOnOutlinedIcon color="action" />
                <Typography sx={{ fontWeight: "bold" }}>Доставка</Typography>
                <Typography
                  sx={{
                    ml: "auto",
                    fontSize: 13,
                    bgcolor: "rgb(255, 243, 180)",
                    py: 0.3,
                    px: 1,
                    borderRadius: 2,
                  }}
                >
                  Швидка відправка
                </Typography>
                <InfoTooltip
                  title="Інформація про доставку"
                  description="Доставка за тарифами перевізника. Після відправки ви
                    отримаєте трек-номер для відстеження посилки."
                />
              </Stack>
              <Stack sx={{ gap: 2 }}>
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <Box component="img" src={novaPoshta} alt="Nova Poshta" />
                  <Typography sx={{ fontSize: 13 }}>
                    У відділення або пункт видачі Нової Пошти
                  </Typography>
                </Stack>
                <Stack
                  sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}
                >
                  <Box component="img" src={novaPoshta} alt="Nova Poshta" />
                  <Typography sx={{ fontSize: 13 }}>
                    Доставка у поштомат Нової Пошти
                  </Typography>
                </Stack>
                <Stack
                  sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}
                >
                  <Box
                    component="img"
                    src={ukrposhta}
                    sx={{ width: 24 }}
                    alt="Ukrposhta"
                  />
                  <Typography sx={{ fontSize: 13 }}>
                    Доставка у відділення Укрпошти
                  </Typography>
                </Stack>
              </Stack>
            </Card>
            <Card
              variant="outlined"
              sx={[
                cardStyles,
                {
                  display: "flex",
                  flex: { lg: 1 },
                  flexDirection: "column",
                  gap: 2,
                },
              ]}
            >
              <Stack spacing={1}>
                <Stack sx={{ flexDirection: "row", gap: 0.5 }}>
                  <PaidOutlinedIcon color="action" />
                  <Typography>Способи оплати</Typography>
                </Stack>
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <Chip label="На карту" sx={{ width: "fit-content" }} />
                  <Chip label="При отриманні" sx={{ width: "fit-content" }} />
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Stack sx={{ flexDirection: "row", gap: 0.5 }}>
                  <AutorenewOutlinedIcon color="action" />
                  <Typography>Повернення та обмін</Typography>
                </Stack>
                <Chip label="Протягом 14 днів" sx={{ width: "fit-content" }} />
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </Stack>
      <CallbackModal
        open={isCallbackModalOpen}
        productTitle={product.title}
        onClose={() => setIsCallbackModalOpen(false)}
      />
    </>
  );
}
