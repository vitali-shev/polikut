import {
  PaymentStatus,
  paymentStatusConfig,
} from "@/entities/order/model/enums/paymentStatus";
import {
  Box,
  Chip,
  ChipProps,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useUpdateOrderMutation } from "@/entities/order/api";

type PaymentStatusChipProps = {
  orderId: number;
  status: PaymentStatus;
} & ChipProps;

export default function PaymentStatusChip({
  orderId,
  status,
  ...props
}: PaymentStatusChipProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  return (
    <Box>
      <Chip
        label={paymentStatusConfig[status].label}
        color={paymentStatusConfig[status].color}
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
        {Object.keys(PaymentStatus).map((statusKey) => (
          <MenuItem
            key={statusKey}
            onClick={() => {
              updateOrder({
                id: orderId,
                paymentStatus: statusKey as PaymentStatus,
              });
              setAnchorEl(null);
            }}
            selected={statusKey === status}
          >
            <Typography variant="body2">
              {paymentStatusConfig[statusKey as PaymentStatus].label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
