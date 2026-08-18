import { SvgIconComponent } from "@mui/icons-material";
import { ChipProps } from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

type PaymentStatusConfig = {
  label: string;
  color: ChipProps["color"];
  icon: SvgIconComponent;
};

export const paymentStatusConfig: Record<PaymentStatus, PaymentStatusConfig> = {
  [PaymentStatus.PAID]: {
    label: "Оплачено",
    color: "success",
    icon: CheckCircleIcon,
  },
  [PaymentStatus.UNPAID]: {
    label: "Не оплачено",
    color: "error",
    icon: CancelIcon,
  },
};
