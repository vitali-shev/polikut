import { DeliveryMethod } from "./enums/deliveryMethods";
import { OrderStatus } from "./enums/orderStatus";
import { PaymentMethod } from "./enums/paymentMethod";
import { PaymentStatus } from "./enums/paymentStatus";

export interface Order {
  id: number;
  orderStatus: OrderStatus;
  fullName: string;
  phoneNumber: string;
  comment: string;
  deliveryMethod: DeliveryMethod;
  settlementName: string;
  settlementRef: string;
  warehouseName: string | null;
  warehouseRef: string | null;
  ukrposhtaAddress: string | null;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  trackingNumber: string | null;
  createdAt: string;
  totalPrice: number;
  items: Item[];
}

export interface Settlement {
  ref: string;
  displayName: string;
}

export interface Warehouse {
  ref: string;
  description: string;
  categoryOfWarehouse: string;
}

export interface Item {
  price: number;
  quantity: number;
  title: string;
  thumbnailUrl: string;
}

export type OrderDeliveryInfo = Pick<
  Order,
  | "fullName"
  | "phoneNumber"
  | "deliveryMethod"
  | "trackingNumber"
  | "settlementName"
  | "warehouseName"
  | "ukrposhtaAddress"
>;

export interface OrderCardResponse extends Pick<
  Order,
  | "id"
  | "orderStatus"
  | "deliveryMethod"
  | "paymentMethod"
  | "paymentStatus"
  | "createdAt"
  | "totalPrice"
> {}

export interface CheckoutForm extends Pick<
  Order,
  "fullName" | "phoneNumber" | "comment" | "ukrposhtaAddress" | "paymentMethod"
> {
  deliveryMethod: DeliveryMethod | null;
  settlement: Settlement | null;
  novaPoshtaBranch: Warehouse | null;
  novaPoshtaPostomat: Warehouse | null;
}

export interface OrderCreateRequest extends Omit<
  CheckoutForm,
  "novaPoshtaBranch" | "novaPoshtaPostomat"
> {
  novaPoshtaWarehouse: Warehouse | null;
  productItems: {
    id: number;
    quantity: number;
  }[];
}

export interface OrderUpdateRequest extends Partial<
  Pick<Order, "orderStatus" | "paymentStatus" | "paymentMethod">
> {}
