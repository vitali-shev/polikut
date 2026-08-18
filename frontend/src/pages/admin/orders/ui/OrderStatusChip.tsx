import {
  OrderStatus,
  orderStatusConfig,
} from "@/entities/order/model/enums/orderStatus";
import Box from "@mui/material/Box";
import Chip, { ChipProps } from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useUpdateOrderMutation } from "@/entities/order/api";

type OrderStatusChipProps = {
  orderId: number;
  status: OrderStatus;
} & ChipProps;

export default function OrderStatusChip({
  orderId,
  status,
  ...props
}: OrderStatusChipProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  return (
    <Box>
      <Chip
        label={orderStatusConfig[status].label}
        color={orderStatusConfig[status].color}
        deleteIcon={<KeyboardArrowDownIcon />}
        onDelete={(event) => setAnchorEl(event.currentTarget)}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        disabled={isLoading}
        sx={{ borderRadius: 1.5, cursor: "pointer" }}
        {...props}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {Object.keys(OrderStatus).map((statusKey) => (
          <MenuItem
            key={statusKey}
            onClick={() => {
              updateOrder({
                id: orderId,
                orderStatus: statusKey as OrderStatus,
              });
              setAnchorEl(null);
            }}
            selected={statusKey === status}
          >
            <Typography variant="body2">
              {orderStatusConfig[statusKey as OrderStatus].label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
