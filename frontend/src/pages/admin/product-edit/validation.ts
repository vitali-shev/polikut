import * as Yup from "yup";

const SELECT_PRODUCT_TO_EDIT_MESSAGE =
  "Оберіть товар зі списку, щоб відкрити форму редагування";

export const searchValidationSchema = Yup.object().shape({
  id: Yup.number()
    .required(SELECT_PRODUCT_TO_EDIT_MESSAGE)
    .positive(SELECT_PRODUCT_TO_EDIT_MESSAGE),
});
