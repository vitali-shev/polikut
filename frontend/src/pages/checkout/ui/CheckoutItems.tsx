import { CartItem } from "@/features/cart/model/types";
import { truncateText } from "@/shared/lib/truncateText";
import { Box, Divider, Stack, Typography } from "@mui/material";

type CheckoutProductsProps = {
  items: CartItem[];
};

export default function CheckoutItems({ items }: CheckoutProductsProps) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Typography sx={{ fontSize: 22 }}>Ваше замовлення</Typography>
      <Stack spacing={0.5}>
        <Divider />
        {items.map((item) => (
          <Stack key={item.id} spacing={0.5}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                py: 0.5,
              }}
            >
              <Box
                component="img"
                src={item.thumbnailUrl}
                sx={{ width: 100, borderRadius: 1, display: "block" }}
              />
              <Stack sx={{ justifyContent: "space-between", width: "100%" }}>
                <Typography sx={{ fontSize: 15 }}>
                  {truncateText(item.title, 40)}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>
                    {item.currentPrice.toLocaleString()} грн.
                  </Typography>
                  <Typography>{item.quantity} шт.</Typography>
                </Box>
              </Stack>
            </Box>
            <Divider />
          </Stack>
        ))}
      </Stack>
      <Typography sx={{ fontSize: 20 }}>
        Разом:{" "}
        {items
          .reduce((sum, item) => sum + item.quantity * item.currentPrice, 0)
          .toLocaleString()}{" "}
        грн.
      </Typography>
    </Stack>
  );
}
