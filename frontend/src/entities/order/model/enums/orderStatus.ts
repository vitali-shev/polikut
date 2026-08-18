import { ChipProps } from "@mui/material/Chip";

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

type OrderStatusConfig = {
  label: string;
  color: ChipProps["color"];
};

export const orderStatusConfig: Record<OrderStatus, OrderStatusConfig> = {
  [OrderStatus.PENDING]: {
    label: "Нове",
    color: "info",
  },
  [OrderStatus.PROCESSING]: {
    label: "В обробці",
    color: "warning",
  },
  [OrderStatus.SHIPPED]: {
    label: "Відправлено",
    color: "secondary",
  },
  [OrderStatus.DELIVERED]: {
    label: "Доставлено",
    color: "success",
  },
  [OrderStatus.CANCELLED]: {
    label: "Скасовано",
    color: "error",
  },
  [OrderStatus.COMPLETED]: {
    label: "Завершено",
    color: "default",
  },
};
