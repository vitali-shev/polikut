import { useAppDispatch } from "@/app/store/hooks";
import SectionTitle from "@/shared/ui/SectionTitle";
import { Stack } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { initialValues } from "@/features/product/model/initialValues";
import ProductForm from "@/features/product/ui/ProductForm";
import { useCreateProductMutation } from "./api";
import { validationSchema } from "@/features/product/model/validation";
import { showNotification } from "@/shared/model/notificationSlice";

export default function ProductCreatePage() {
  const [createProduct] = useCreateProductMutation();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createProduct(values).unwrap();
        resetForm();
        dispatch(
          showNotification({
            message: "Товар успішно додано до каталогу",
            severity: "success",
          }),
        );
      } catch {}
    },
  });

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <SectionTitle>Додати товар</SectionTitle>
      <FormikProvider value={formik}>
        <ProductForm />
      </FormikProvider>
    </Stack>
  );
}
