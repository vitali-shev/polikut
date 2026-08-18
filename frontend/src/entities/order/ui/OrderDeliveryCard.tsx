import { tableHeadStyles } from "@/shared/ui/styles/tableHead";
import Box from "@mui/material/Box";
import Card, { CardProps } from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { deliveryMethodConfig } from "../model/enums/deliveryMethods";
import { OrderDeliveryInfo } from "../model";
import Chip from "@mui/material/Chip";

type OrderDeliveryCardProps = {
  order: OrderDeliveryInfo;
  showTrackingNumber?: boolean;
} & CardProps;

export default function OrderDeliveryCard({
  order,
  showTrackingNumber = false,
  ...props
}: OrderDeliveryCardProps) {
  return (
    <Card {...props}>
      <Typography sx={{ fontWeight: "bold" }}>Доставка</Typography>
      <Box sx={tableHeadStyles}>
        <Typography sx={{ fontSize: 15, flex: 1 }}>Отримувач</Typography>
        <Typography sx={{ fontSize: 15, flex: 1 }}>Номер телефону</Typography>
        <Typography sx={{ fontSize: 15, flex: 1 }}>Спосіб доставки</Typography>
        {showTrackingNumber && (
          <Typography sx={{ fontSize: 15, flex: 1 }}>
            Номер накладної
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", textAlign: "center" }}>
        <Typography sx={{ fontSize: 15, flex: 1 }}>{order.fullName}</Typography>
        <Typography sx={{ fontSize: 15, flex: 1 }}>
          {order.phoneNumber}
        </Typography>
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Chip
            size="small"
            label={deliveryMethodConfig[order.deliveryMethod].label}
            color={deliveryMethodConfig[order.deliveryMethod].color}
            sx={{ borderRadius: 1.5 }}
          />
        </Box>
        {showTrackingNumber && (
          <Typography sx={{ fontSize: 15, flex: 1 }}>
            {order.trackingNumber ?? "Не вказано"}
          </Typography>
        )}
      </Box>
      <Box sx={tableHeadStyles}>
        <Typography sx={{ fontSize: 15, flex: 1 }}>Адреса</Typography>
        <Typography sx={{ fontSize: 15, flex: 1 }}>Пункт видачі</Typography>
      </Box>
      <Box sx={{ display: "flex", textAlign: "center" }}>
        <Typography sx={{ fontSize: 15, flex: 1 }}>
          {order.settlementName}
        </Typography>
        <Typography sx={{ fontSize: 15, flex: 1 }}>
          {order.warehouseName ?? order.ukrposhtaAddress}
        </Typography>
      </Box>
    </Card>
  );
}
