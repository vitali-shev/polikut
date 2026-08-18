import { truncateText } from "@/shared/lib/truncateText";
import { tableHeadStyles } from "@/shared/ui/styles/tableHead";
import Box from "@mui/material/Box";
import Card, { CardProps } from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Item } from "../model";

type OrderItemsTableProps = {
  items: Item[];
} & CardProps;

export default function OrderItemsCard({
  items,
  ...props
}: OrderItemsTableProps) {
  return (
    <Card {...props}>
      <Typography sx={{ fontWeight: "bold" }}>Склад замовлення</Typography>
      <Box sx={tableHeadStyles}>
        <Typography sx={{ fontSize: 15, width: "55%", textAlign: "start" }}>
          Товар
        </Typography>
        <Typography sx={{ fontSize: 15, width: "15%" }}>К-сть</Typography>
        <Typography sx={{ fontSize: 15, width: "15%" }}>Ціна</Typography>
        <Typography sx={{ fontSize: 15, width: "15%" }}>Разом</Typography>
      </Box>
      <Stack spacing={1} divider={<Divider />}>
        {items.map((item, index) => (
          <Box key={index} sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ display: "flex", width: "55%", gap: 1 }}>
              <Box
                component="img"
                src={item.thumbnailUrl}
                sx={{ width: 60, borderRadius: 1 }}
              />
              <Typography sx={{ fontSize: 15 }}>
                {truncateText(item.title, 30)}
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: 15, width: "15%", textAlign: "center" }}
            >
              {item.quantity}
            </Typography>
            <Typography
              sx={{ fontSize: 15, width: "15%", textAlign: "center" }}
            >
              {item.price.toLocaleString()}
            </Typography>
            <Typography
              sx={{ fontSize: 15, width: "15%", textAlign: "center" }}
            >
              {(item.quantity * item.price).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
