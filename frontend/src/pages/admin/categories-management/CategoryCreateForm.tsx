import { Box, Button, Link, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useCreateCategoryMutation } from "@/entities/category/api";
import { useAppDispatch } from "@/app/store/hooks";
import { showNotification } from "@/shared/model/notificationSlice";
import { CategoryCreateRequest } from "@/entities/category/model";
import SectionTitle from "@/shared/ui/SectionTitle";

const initialValues: CategoryCreateRequest = {
  icon: "",
  name: "",
};

export default function CategoryCreateForm() {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        await createCategory(values).unwrap();
        dispatch(
          showNotification({
            message: "Категорію успішно створено",
            severity: "success",
          }),
        );
      } catch {}
    },
  });

  return (
    <Stack spacing={1}>
      <SectionTitle>Додати категорію</SectionTitle>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            flex: { xs: "1 1 100%", md: 1 },
          }}
        >
          <TextField
            name="icon"
            placeholder="Іконка*"
            value={formik.values.icon}
            onChange={formik.handleChange}
            size="small"
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
          sx={{ flex: { xs: "1 1 100%", md: 1 } }}
          name="name"
          placeholder="Назва*"
          value={formik.values.name}
          onChange={formik.handleChange}
          size="small"
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
          sx={{ height: 40, width: 112 }}
        >
          Створити
        </Button>
      </Box>
    </Stack>
  );
}
