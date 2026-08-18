import { OrderCardResponse } from "@/entities/order/model";
import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { deliveryMethodConfig } from "@/entities/order/model/enums/deliveryMethods";
import { Link } from "react-router-dom";
import { routes } from "@/app/router/routes";
import OrderStatusChip from "./OrderStatusChip";
import PaymentStatusChip from "./PaymentStatusChip";
import PaymentMethodChip from "./PaymentMethodChip";
import DeleteIconButton from "@/shared/ui/DeleteIconButton";
import { useDeleteOrderMutation } from "@/entities/order/api";
import { cardStyles } from "@/shared/ui/styles/card";

type OrderCardProps = {
  order: OrderCardResponse;
};

export default function OrderCard({ order }: OrderCardProps) {
  const [deleteButton, { isLoading }] = useDeleteOrderMutation();

  return (
    <Card sx={cardStyles}>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              component={Link}
              to={routes.ADMIN.ORDERS.DETAILS.getPath(order.id)}
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                color: "inherit",
                textDecoration: "none",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              Замовлення №{String(order.id).padStart(4, "0")}
            </Typography>
            <Box sx={{ pt: 0.5, display: "flex", gap: 1 }}>
              <Typography>Статус:</Typography>
              <OrderStatusChip
                size="small"
                orderId={order.id}
                status={order.orderStatus}
              />
            </Box>
          </Box>
          <DeleteIconButton
            onClick={() => {
              const confirmed = window.confirm(
                "Ви дійсно хочете видалити це замовлення?",
              );

              if (!confirmed) return;
              deleteButton(order.id);
            }}
            disabled={isLoading}
            sx={{ mt: -1.5, mr: -1.5 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Доставка</Typography>
            <Chip
              size="small"
              label={deliveryMethodConfig[order.deliveryMethod].label}
              color={deliveryMethodConfig[order.deliveryMethod].color}
              sx={{ borderRadius: 1.5, cursor: "pointer" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Спосіб оплати</Typography>
            <PaymentMethodChip
              size="small"
              orderId={order.id}
              method={order.paymentMethod}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Статус оплати</Typography>
            <PaymentStatusChip
              size="small"
              orderId={order.id}
              status={order.paymentStatus}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>
            <strong>
              {new Date(order.createdAt).toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </strong>
          </Typography>
          <Typography>
            До сплати: <strong>{order.totalPrice.toLocaleString()}</strong> грн.
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
