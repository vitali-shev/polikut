import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/entities/category/api";
import { useAppDispatch } from "@/app/store/hooks";
import { showNotification } from "@/shared/model/notificationSlice";
import SectionTitle from "@/shared/ui/SectionTitle";

export default function CategoryDeleteForm() {
  const { data: categories = [] } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const dispatch = useAppDispatch();

  const formik = useFormik<{ id: number }>({
    initialValues: {
      id: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await deleteCategory(values.id).unwrap();
        dispatch(
          showNotification({
            message: "Категорію успішно видалено",
            severity: "success",
          }),
        );

        resetForm();
      } catch {}
    },
  });

  return (
    <Stack spacing={1} sx={{ maxWidth: 500 }}>
      <SectionTitle>Видалити категорію</SectionTitle>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Autocomplete
          disablePortal
          noOptionsText="Немає варіантів"
          options={categories}
          getOptionLabel={(option) => option.name}
          value={
            categories.find((category) => category.id === formik.values.id) ||
            null
          }
          onChange={(_, value) => {
            formik.setFieldValue("id", value?.id || 0);
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Оберіть для видалення" />
          )}
          size="small"
          sx={{ flex: { xs: "1 1 100%", md: 1 } }}
        />
        <Button
          variant="contained"
          type="submit"
          color="error"
          disabled={isLoading}
          sx={{ height: 40, width: 112 }}
        >
          Видалити
        </Button>
      </Box>
    </Stack>
  );
}
