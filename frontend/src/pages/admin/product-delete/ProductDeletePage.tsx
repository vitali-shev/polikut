import { useAppDispatch } from "@/app/store/hooks";
import {
  useDeleteProductMutation,
  useGetProductOptionsQuery,
} from "@/entities/product/api";
import { showNotification } from "@/shared/model/notificationSlice";
import SectionTitle from "@/shared/ui/SectionTitle";
import { mainButtonStyles } from "@/shared/ui/styles/button";
import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";

export default function ProductDeletePage() {
  const { data: options = [] } = useGetProductOptionsQuery();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const dispatch = useAppDispatch();

  const formik = useFormik<{ id: number }>({
    initialValues: {
      id: 0,
    },
    onSubmit: async (values) => {
      try {
        await deleteProduct(values.id).unwrap();
        dispatch(
          showNotification({
            message: "Товар успішно видалено",
            severity: "success",
          }),
        );
      } catch {}
    },
  });

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <SectionTitle>Видалити продукт</SectionTitle>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.title}
            value={
              options.find((product) => product.id === formik.values.id) || null
            }
            onChange={(_, value) => {
              formik.setFieldValue("id", value?.id || 0);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Оберіть товар для видалення"
              />
            )}
            noOptionsText="Немає варіантів"
            size="small"
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            color="error"
            type="submit"
            disabled={isLoading}
            sx={[mainButtonStyles, { height: 40, alignSelf: "flex-start" }]}
          >
            Видалити
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
