import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { SvgIconComponent } from "@mui/icons-material";

export enum PaymentMethod {
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  CARD_TRANSFER = "CARD_TRANSFER",
}

type PaymenttMethodConfig = {
  label: string;
  icon: SvgIconComponent;
};

export const paymentMethodConfig: Record<PaymentMethod, PaymenttMethodConfig> =
  {
    [PaymentMethod.CASH_ON_DELIVERY]: {
      label: "Оплата при отриманні",
      icon: LocalAtmIcon,
    },
    [PaymentMethod.CARD_TRANSFER]: {
      label: "Банківський переказ",
      icon: CreditCardIcon,
    },
  };
