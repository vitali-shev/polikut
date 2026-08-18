import { ChipProps } from "@mui/material/Chip";

export enum DeliveryMethod {
  NOVA_POSHTA_BRANCH = "NOVA_POSHTA_BRANCH",
  NOVA_POSHTA_POSTOMAT = "NOVA_POSHTA_POSTOMAT",
  UKRPOSHTA = "UKRPOSHTA",
}

type DeliveryMethodConfig = {
  label: string;
  color: ChipProps["color"];
};

export const deliveryMethodConfig: Record<
  DeliveryMethod,
  DeliveryMethodConfig
> = {
  [DeliveryMethod.NOVA_POSHTA_BRANCH]: {
    label: "Відділення НП",
    color: "secondary",
  },
  [DeliveryMethod.NOVA_POSHTA_POSTOMAT]: {
    label: "Поштомат НП",
    color: "info",
  },
  [DeliveryMethod.UKRPOSHTA]: {
    label: "Укрпошта",
    color: "warning",
  },
};
