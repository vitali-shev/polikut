import { useGetOrderCardsQuery } from "@/entities/order/api";
import { Grid, Stack, Typography } from "@mui/material";
import OrderCard from "./ui/OrderCard";
import SectionTitle from "@/shared/ui/SectionTitle";

export default function OrdersPage() {
  const { data = [] } = useGetOrderCardsQuery();

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <SectionTitle>Список замовлень</SectionTitle>
      <Stack sx={{ alignItems: "center", gap: 2 }}>
        {data.length === 0 ? (
          <Typography sx={{ textAlign: "center" }}>
            Список замовлень порожній
            <br />
            Нові замовлення з'являться тут автоматично після оформлення
            клієнтами.
          </Typography>
        ) : (
          <Grid container spacing={2} sx={{ width: "100%" }}>
            {data.map((order) => (
              <Grid key={order.id} size={6}>
                <OrderCard order={order} />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Stack>
  );
}
