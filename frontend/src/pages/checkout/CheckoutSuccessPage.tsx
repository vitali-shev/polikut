import { routes } from "@/app/router/routes";
import { useGetOrderDetailsQuery } from "@/entities/order/api";
import SectionTitle from "@/shared/ui/SectionTitle";
import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import { Link, Navigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { paymentMethodConfig } from "@/entities/order/model/enums/paymentMethod";
import React from "react";
import { cardStyles } from "@/shared/ui/styles/card";
import { tableHeadStyles } from "@/shared/ui/styles/tableHead";
import { mainButtonStyles } from "@/shared/ui/styles/button";
import OrderItemsCard from "@/entities/order/ui/OrderItemsCard";
import OrderDeliveryCard from "@/entities/order/ui/OrderDeliveryCard";
import OrderCommentCard from "@/entities/order/ui/OrderCommentCard";

const formatDeliveryRange = (createdAt: string) => {
  const start = new Date(createdAt);
  start.setDate(start.getDate() + 1);

  const end = new Date(createdAt);
  end.setDate(end.getDate() + 2);

  const startFormatted = start.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
  });

  const endFormatted = end.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
  });

  return `${startFormatted} - ${endFormatted}`;
};

export default function CheckoutSuccessPage() {
  const { id } = useParams();
  const { data: order, isError } = useGetOrderDetailsQuery(Number(id));

  if (isError) return <Navigate to={routes.HOME} />;

  if (!order) return;

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <SectionTitle sx={{ fontWeight: "bold", fontSize: 20 }}>
        Деталі замовлення №{String(order.id).padStart(4, "0")}
      </SectionTitle>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Stack spacing={2} sx={{ flex: 2.5, height: "fit-content" }}>
            <Card sx={[cardStyles, { bgcolor: "rgb(240, 253, 244)" }]}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                <Stack>
                  <Typography>Дякуємо, що обираєте нас!</Typography>
                  <Typography>Ми вже обробляємо ваше замовлення.</Typography>
                </Stack>
              </Stack>
            </Card>
            <Card
              sx={[
                cardStyles,
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                },
              ]}
            >
              <Box sx={tableHeadStyles}>
                <Typography sx={{ flex: 0.8, fontSize: 15 }}>Статус</Typography>
                <Typography sx={{ flex: 1, fontSize: 15 }}>
                  Оформлено
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 15 }}>
                  Очікувана доставка
                </Typography>
              </Box>
              <Box sx={{ display: "flex", textAlign: "center" }}>
                <Typography sx={{ flex: 0.8, fontSize: 15 }}>
                  В обробці
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 15 }}>
                  {new Date(order.createdAt).toLocaleDateString("uk-UA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 15 }}>
                  {formatDeliveryRange(order.createdAt)}
                </Typography>
              </Box>
            </Card>
          </Stack>
          <Card
            sx={[
              cardStyles,
              {
                display: "flex",
                flex: 1,
                flexDirection: "column",
                gap: { xs: 0.5, md: 0 },
              },
            ]}
          >
            <Typography gutterBottom sx={{ fontWeight: "bold" }}>
              Оплата
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 15 }}>
              Спосіб оплати
            </Typography>
            <Chip
              label={paymentMethodConfig[order.paymentMethod].label}
              icon={React.createElement(
                paymentMethodConfig[order.paymentMethod].icon,
              )}
            />
            <Box
              sx={{
                mt: "auto",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: 15 }}>Кількість одиниць:</Typography>
              <Typography sx={{ fontSize: 15 }}>
                {order.items.reduce((acc, item) => acc + item.quantity, 0)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: 15 }}>Вартість товарів:</Typography>
              <Typography sx={{ fontSize: 15 }}>
                {order.totalPrice.toLocaleString()} грн.
              </Typography>
            </Box>
          </Card>
        </Stack>
        <OrderItemsCard
          items={order.items}
          sx={[
            cardStyles,
            {
              display: "flex",
              flexDirection: "column",
              gap: 1,
            },
          ]}
        />
        <OrderDeliveryCard
          order={order}
          sx={[
            cardStyles,
            {
              display: "flex",
              flexDirection: "column",
              gap: 1,
            },
          ]}
        />
        {order.comment.length > 0 && (
          <OrderCommentCard
            title="Ваш коментар до замовлення"
            comment={order.comment}
            sx={cardStyles}
          />
        )}
        <Button
          component={Link}
          to={routes.HOME}
          size="large"
          variant="contained"
          color="secondary"
          sx={mainButtonStyles}
        >
          Повернутися до покупок
        </Button>
      </Stack>
    </Stack>
  );
}
