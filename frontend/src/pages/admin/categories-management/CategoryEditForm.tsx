import {
  Autocomplete,
  Box,
  Button,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/entities/category/api";
import { useAppDispatch } from "@/app/store/hooks";
import { showNotification } from "@/shared/model/notificationSlice";
import { CategoryUpdateRequest } from "@/entities/category/model";
import SectionTitle from "@/shared/ui/SectionTitle";

const initialValues: CategoryUpdateRequest = {
  id: 0,
  icon: "",
  name: "",
};

export default function CategoryEditForm() {
  const { data: categories = [] } = useGetCategoriesQuery();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        await updateCategory(values).unwrap();
        dispatch(
          showNotification({
            message: "Зміни успішно збережено",
            severity: "success",
          }),
        );
      } catch {}
    },
  });

  return (
    <Stack spacing={1}>
      <SectionTitle>Редагувати категорію</SectionTitle>
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
            formik.setFieldValue("icon", value?.icon || "");
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Оберіть для редагування" />
          )}
          size="small"
          sx={{ flex: { xs: "1 1 100%", md: 1 } }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            flex: { xs: "1 1 100%", md: 1 },
          }}
        >
          <TextField
            fullWidth
            name="icon"
            placeholder="Іконка*"
            size="small"
            value={formik.values.icon}
            onChange={formik.handleChange}
          />
          <Link
            component="a"
            href="https://fonts.google.com/icons?icon.set=Material+Icons&icon.size=24&icon.color=%231f1f1f"
            target="_blank"
            sx={{
              pr: 1,
              alignSelf: "flex-end",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Обрати іконку
          </Link>
        </Box>
        <TextField
          name="name"
          placeholder="Нова назва*"
          size="small"
          value={formik.values.name}
          onChange={formik.handleChange}
          sx={{ flex: { xs: "1 1 100%", md: 1 } }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
          sx={{ height: 40, width: 112 }}
        >
          Змінити
        </Button>
      </Box>
    </Stack>
  );
}
