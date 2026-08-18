import {
  PaymentMethod,
  paymentMethodConfig,
} from "@/entities/order/model/enums/paymentMethod";
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

type PaymentMethodChipProps = {
  orderId: number;
  method: PaymentMethod;
} & ChipProps;

export default function PaymentMethodChip({
  orderId,
  method,
  ...props
}: PaymentMethodChipProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  return (
    <Box>
      <Chip
        label={paymentMethodConfig[method].label}
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
        {Object.keys(PaymentMethod).map((methodKey) => (
          <MenuItem
            key={methodKey}
            onClick={() => {
              updateOrder({
                id: orderId,
                paymentMethod: methodKey as PaymentMethod,
              });
              setAnchorEl(null);
            }}
            selected={methodKey === method}
          >
            <Typography variant="body2">
              {paymentMethodConfig[methodKey as PaymentMethod].label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
