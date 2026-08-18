import { Stack } from "@mui/material";
import CategoryCreateForm from "./CategoryCreateForm";
import CategoryEditForm from "./CategoryEditForm";
import CategoryDeleteForm from "./CategoryDeleteForm";

export default function CategoriesManagementPage() {
  return (
    <Stack sx={{ width: "100%" }}>
      <CategoryCreateForm />
      <CategoryEditForm />
      <CategoryDeleteForm />
    </Stack>
  );
}
