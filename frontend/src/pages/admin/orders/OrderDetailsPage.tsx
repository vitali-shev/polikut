import {
  useDeleteOrderMutation,
  useGetOrderDetailsQuery,
} from "@/entities/order/api";
import { paymentMethodConfig } from "@/entities/order/model/enums/paymentMethod";
import { paymentStatusConfig } from "@/entities/order/model/enums/paymentStatus";
import SectionTitle from "@/shared/ui/SectionTitle";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderStatusChip from "./ui/OrderStatusChip";
import PaymentMethodChip from "./ui/PaymentMethodChip";
import PaymentStatusChip from "./ui/PaymentStatusChip";
import DeleteIconButton from "@/shared/ui/DeleteIconButton";
import { routes } from "@/app/router/routes";
import { cardStyles } from "@/shared/ui/styles/card";
import { tableHeadStyles } from "@/shared/ui/styles/tableHead";
import OrderItemsCard from "@/entities/order/ui/OrderItemsCard";
import OrderDeliveryCard from "@/entities/order/ui/OrderDeliveryCard";
import OrderCommentCard from "@/entities/order/ui/OrderCommentCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { data: order } = useGetOrderDetailsQuery(Number(id));
  const [deleteButton, { isLoading }] = useDeleteOrderMutation();
  const navigate = useNavigate();

  if (!order) return;

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <SectionTitle>Деталі замовлення</SectionTitle>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Card
          sx={[
            cardStyles,
            { display: "flex", flexDirection: "column", gap: 1 },
          ]}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              Замовлення №{String(order.id).padStart(4, "0")}
            </Typography>
            <DeleteIconButton
              onClick={async () => {
                const confirmed = window.confirm(
                  "Ви дійсно хочете видалити це замовлення?",
                );

                if (!confirmed) return;

                await deleteButton(order.id).unwrap();
                navigate(routes.ADMIN.ORDERS.path);
              }}
              disabled={isLoading}
              sx={{ mb: "auto", mr: -1.5, mt: -1.5 }}
            />
          </Box>
          <Box sx={tableHeadStyles}>
            <Typography sx={{ flex: 1, fontSize: 15, textAlign: "center" }}>
              Статус
            </Typography>
            <Typography sx={{ flex: 1, fontSize: 15, textAlign: "center" }}>
              Оформлено
            </Typography>
            <Typography sx={{ flex: 1, fontSize: 15, textAlign: "center" }}>
              До сплати
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <OrderStatusChip
                size="small"
                orderId={order.id}
                status={order.orderStatus}
              />
            </Box>
            <Typography sx={{ flex: 1, fontSize: 15, textAlign: "center" }}>
              {new Date(order.createdAt).toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            <Typography
              sx={{
                flex: 1,
                fontSize: 15,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {order.totalPrice.toLocaleString()} грн.
            </Typography>
          </Box>
        </Card>
        <Box sx={{ display: "flex", gap: 2 }}>
          <OrderItemsCard
            items={order.items}
            sx={[
              cardStyles,
              {
                flex: 2.5,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                height: "fit-content",
              },
            ]}
          />
          <Card sx={[cardStyles, { flex: 1, height: "fit-content" }]}>
            <Typography gutterBottom sx={{ fontWeight: "bold" }}>
              Оплата
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 15 }}>
              Спосіб оплати
            </Typography>
            <PaymentMethodChip
              orderId={order.id}
              method={order.paymentMethod}
              icon={React.createElement(
                paymentMethodConfig[order.paymentMethod].icon,
              )}
              sx={{
                bgcolor: "white",
                border: "1px solid silver",
                cursor: "pointer",
              }}
            />
            <Typography gutterBottom sx={{ pt: 1, fontSize: 15 }}>
              Статус оплати
            </Typography>
            <PaymentStatusChip
              orderId={order.id}
              status={order.paymentStatus}
              icon={React.createElement(
                paymentStatusConfig[order.paymentStatus].icon,
              )}
              sx={{ cursor: "pointer" }}
            />
          </Card>
        </Box>
        <OrderDeliveryCard
          order={order}
          showTrackingNumber
          sx={[
            cardStyles,
            { display: "flex", flexDirection: "column", gap: 1 },
          ]}
        />
        {order.comment.length > 0 && (
          <OrderCommentCard
            title="Коментар до замовлення"
            comment={order.comment}
            sx={cardStyles}
          />
        )}
      </Box>
    </Stack>
  );
}
