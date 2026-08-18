export type CallbackModalProps = {
  productTitle?: string;
  open: boolean;
  onClose: () => void;
};

export type CallbackForm = {
  phoneNumber: string;
  comment: string;
};

export type CallbackRequest = CallbackForm & { productTitle?: string };
