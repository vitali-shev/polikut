import * as Yup from "yup";
import { fields } from "./fields";
import { FORM_MESSAGES } from "@/shared/config/validation";

export const validationSchema = Yup.object({
  [fields.originalPrice]: Yup.number()
    .required(FORM_MESSAGES.REQUIRED_FIELDS_EMPTY)
    .typeError("Ціна повинна бути числом")
    .integer("Ціна має бути цілим числом"),
  [fields.specifications.root]: Yup.array().of(
    Yup.object({
      name: Yup.string().required(FORM_MESSAGES.REQUIRED_FIELDS_EMPTY),
      value: Yup.string().required(FORM_MESSAGES.REQUIRED_FIELDS_EMPTY),
    }),
  ),
  [fields.benefits.root]: Yup.array().of(
    Yup.string().required(FORM_MESSAGES.REQUIRED_FIELDS_EMPTY),
  ),
});
