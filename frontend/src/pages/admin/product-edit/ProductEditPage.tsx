import {
  useLazyGetProductForAdminQuery,
  useGetProductOptionsQuery,
} from "@/entities/product/api";
import { Box, Button, Stack, TextField } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import SectionTitle from "@/shared/ui/SectionTitle";
import { useAppDispatch } from "@/app/store/hooks";
import { showNotification } from "@/shared/model/notificationSlice";
import ProductForm from "@/features/product/ui/ProductForm";
import { useUpdateProductMutation } from "./api";
import { ProductForAdminResponse } from "@/entities/product/model";
import {
  initialValues,
  initImageUploadSlots,
} from "@/features/product/model/initialValues";
import { validationSchema } from "@/features/product/model/validation";
import { fields } from "@/features/product/model/fields";
import { mainButtonStyles } from "@/shared/ui/styles/button";
import AppAutocomplete from "@/shared/ui/AppAutocomplete";
import { searchValidationSchema } from "./validation";

type SearchFormValues = { id: number };
const searchInitialValues: SearchFormValues = { id: 0 };

export default function ProductEditPage() {
  const { data: options = [] } = useGetProductOptionsQuery();
  const [getProduct, { isLoading }] = useLazyGetProductForAdminQuery();
  const [product, setProduct] = useState<ProductForAdminResponse | undefined>(
    undefined,
  );
  const [updateProduct] = useUpdateProductMutation();
  const dispatch = useAppDispatch();

  const searchForm = useFormik<SearchFormValues>({
    initialValues: searchInitialValues,
    validationSchema: searchValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const { data } = await getProduct(values.id);
        setProduct(data);
      } catch {}
    },
  });

  const editForm = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const id = product?.id || 0;
      try {
        await updateProduct({ id, ...values }).unwrap();
        dispatch(
          showNotification({
            message: "Зміни до товару успішно збережено",
            severity: "success",
          }),
        );
      } catch {}
    },
  });

  useEffect(() => {
    if (product) {
      editForm.setValues({
        [fields.title]: product.title,
        [fields.description]: product.description,
        [fields.specifications.root]: product.specifications,
        [fields.benefits.root]: product.benefits,
        [fields.originalPrice]: product.originalPrice,
        [fields.discountPercent]: product.discountPercent,
        [fields.images.root]: initImageUploadSlots(product.images),
        [fields.categoryIds]: product.categoryIds,
      });
    }
  }, [product]);

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <SectionTitle>Редагувати продукт</SectionTitle>
      <Stack spacing={2}>
        <FormikProvider value={searchForm}>
          <Box
            component="form"
            onSubmit={searchForm.handleSubmit}
            sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
          >
            <AppAutocomplete
              disablePortal
              options={options}
              getOptionLabel={(option) => option.title}
              value={
                options.find(
                  (product) => product.id === searchForm.values.id,
                ) ?? null
              }
              onChange={(_, value) => {
                searchForm.setFieldValue("id", value?.id || null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Оберіть товар для редагування"
                  error={!!searchForm.errors.id}
                  helperText={searchForm.errors.id}
                />
              )}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={[mainButtonStyles, { height: 40, alignSelf: "flex-start" }]}
            >
              Знайти
            </Button>
          </Box>
        </FormikProvider>

        {product && (
          <FormikProvider value={editForm}>
            <ProductForm />
          </FormikProvider>
        )}
      </Stack>
    </Stack>
  );
}
