import { type ProductCard } from "@/entities/product/model";
import {
  Box,
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import defaultImage from "@/entities/product/assets/default-image.svg";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { routes } from "@/app/router/routes";
import { PriceBlock, ProductBadges } from "@/entities/product/ui";
import { useAppDispatch } from "@/app/store/hooks";
import { addToCart } from "@/features/cart/model/cartSlice";
import { showNotification } from "@/shared/model/notificationSlice";
import { truncateText } from "@/shared/lib/truncateText";
import { createCartItem } from "@/features/cart/model/mappers";

export type ProductCardProps = {
  product: ProductCard;
};

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        maxWidth: "100%",
        minWidth: 162,
        height: "100%",
        borderRadius: 0,
        p: { xs: 1, md: 1.5 },
      }}
    >
      <Box
        component={Link}
        to={routes.PRODUCTS.DETAILS.getPath(product.id)}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Box
          component="img"
          src={product.thumbnailUrl ?? defaultImage}
          sx={{ width: "100%", borderRadius: 1 }}
        />
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 600,
            minHeight: "3em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {product.title}
        </Typography>
        <ProductBadges
          discountPercent={product.discountPercent}
          isNew={product.isNew}
          sx={{ position: "absolute", gap: 0.4, top: 4, left: 4 }}
        />
      </Box>
      <Button
        component={Link}
        to={routes.PRODUCTS.DETAILS.getPath(product.id)}
        variant="outlined"
        color="secondary"
        sx={{ borderRadius: 5 }}
      >
        Детальніше
      </Button>
      <Box
        sx={{
          mt: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <PriceBlock
          originalPrice={product.originalPrice}
          discountPercent={product.discountPercent}
          currentPrice={product.currentPrice}
        />
        <Tooltip title="Додати в кошик" arrow>
          <IconButton
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
            sx={{
              bgcolor: "primary.main",
              color: "white",
              width: 40,
              height: 40,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            <ShoppingBagOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}
