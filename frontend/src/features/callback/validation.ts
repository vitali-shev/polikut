import * as Yup from "yup";

export const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .trim()
    .required("Вкажіть номер телефону")
    .transform((value) => value.replace(/\D/g, ""))
    .length(12, "Вкажіть коректний номер, наприклад:\n +380 (67) 123 45 67"),
});
