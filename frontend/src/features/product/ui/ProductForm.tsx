import DeleteIconButton from "@/shared/ui/DeleteIconButton";
import ImageUploader from "@/shared/ui/ImageUploader";
import { cardStyles } from "@/shared/ui/styles/card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { fields } from "../model/fields";
import { useGetCategoriesQuery } from "@/entities/category/api";
import AppTextField from "@/shared/ui/AppTextField";
import { ProductFormValues } from "../model/types";
import {
  Field,
  FieldArray,
  FormikProvider,
  getIn,
  useFormikContext,
} from "formik";
import AppAutocomplete from "@/shared/ui/AppAutocomplete";
import { Alert, IconButton } from "@mui/material";
import { getFirstFormError } from "@/shared/lib/form/getFirstError";
import AddIcon from "@mui/icons-material/Add";
import { mainButtonStyles } from "@/shared/ui/styles/button";
import { deleteIconButton, iconButtonStyles } from "./styles";
import InfoTooltip from "@/shared/ui/InfoTooltip";

export default function ProductForm() {
  const { data: categories = [] } = useGetCategoriesQuery();

  const formik = useFormikContext<ProductFormValues>();
  const firstErrorMessage = getFirstFormError(formik.errors);

  return (
    <Card sx={cardStyles}>
      {firstErrorMessage && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {firstErrorMessage}
        </Alert>
      )}
      <FormikProvider value={formik}>
        <Stack component="form" onSubmit={formik.handleSubmit} sx={{ gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {formik.values.images.map((slot, index) => (
              <Box key={index}>
                <Typography sx={{ textAlign: "center", fontSize: 14 }}>
                  {slot.description}
                </Typography>
                <ImageUploader
                  url={slot.serverImage?.url}
                  file={slot.file}
                  onChange={(file) => {
                    formik.setFieldValue(
                      fields.images.getFilePath(index),
                      file,
                    );
                  }}
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <AppTextField
              name={fields.title}
              placeholder="Назва*"
              value={formik.values.title}
              onChange={formik.handleChange}
              helperText={`${formik.values.title.length}/60 символів (рекомендовано для SEO)`}
              error={!!formik.errors.title}
              sx={{ flex: 4, minWidth: 180 }}
            />
            <AppTextField
              name={fields.discountPercent}
              placeholder="Знижка"
              value={formik.values.discountPercent}
              onChange={formik.handleChange}
              error={!!formik.errors.discountPercent}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                },
              }}
              sx={{ flex: 1, minWidth: 160 }}
            />
            <AppTextField
              name={fields.originalPrice}
              placeholder="Ціна*"
              value={formik.values.originalPrice}
              onChange={formik.handleChange}
              error={!!formik.errors.originalPrice}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">грн.</InputAdornment>
                  ),
                },
              }}
              sx={{ flex: 1, minWidth: 160 }}
            />
          </Box>
          <AppTextField
            name={fields.description}
            placeholder="Опис"
            value={formik.values.description}
            onChange={formik.handleChange}
            helperText={`${formik.values.description.length}/160 символів (рекомендовано для SEO)`}
            error={!!formik.errors.description}
            multiline
            rows={4}
          />
          <AppAutocomplete
            options={categories}
            getOptionLabel={(option) => option.name}
            onChange={(_, newValue) => {
              formik.setFieldValue(
                fields.categoryIds,
                newValue.map((category) => category.id),
              );
            }}
            value={categories.filter((category) =>
              formik.values.categoryIds.includes(category.id),
            )}
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  formik.values.categoryIds.length === 0
                    ? "Категорії товару*"
                    : ""
                }
                error={!!formik.errors.categoryIds}
              />
            )}
            sx={{ flex: 1, minWidth: 250 }}
          />
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography>Характеристики</Typography>
            <IconButton
              onClick={() =>
                formik.setFieldValue(fields.specifications.root, [
                  ...formik.values.specifications,
                  { name: "", value: "" },
                ])
              }
              sx={iconButtonStyles}
            >
              <AddIcon color="success"></AddIcon>
            </IconButton>
          </Stack>
          {formik.values.specifications.length > 0 && (
            <FieldArray name={fields.specifications.root}>
              {({ remove }) => (
                <Stack spacing={1}>
                  {formik.values.specifications.map((_, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={1}
                      sx={{ width: "100%", alignItems: "center" }}
                    >
                      <Field
                        name={fields.specifications.getNamePath(index)}
                        as={AppTextField}
                        placeholder="Назва*"
                        error={getIn(
                          formik.errors,
                          fields.specifications.getNamePath(index),
                        )}
                        sx={{ flex: 1 }}
                      />
                      <Field
                        name={fields.specifications.getValuePath(index)}
                        as={AppTextField}
                        placeholder="Значення*"
                        error={
                          !!getIn(
                            formik.errors,
                            fields.specifications.getValuePath(index),
                          )
                        }
                        sx={{ flex: 2 }}
                      />
                      <DeleteIconButton
                        onClick={() => remove(index)}
                        sx={deleteIconButton}
                      />
                    </Stack>
                  ))}
                </Stack>
              )}
            </FieldArray>
          )}
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography>Переваги</Typography>
            <IconButton
              onClick={() =>
                formik.setFieldValue(fields.benefits.root, [
                  ...formik.values.benefits,
                  "",
                ])
              }
              sx={iconButtonStyles}
            >
              <AddIcon color="success"></AddIcon>
            </IconButton>
            <InfoTooltip
              title="Як додавати переваги"
              description="Починайте текст з малої літери, щоб переваги гармонійно виглядали в списку на сайті."
            />
          </Stack>
          {formik.values.benefits.length > 0 && (
            <FieldArray name={fields.benefits.root}>
              {({ remove }) => (
                <Stack spacing={1}>
                  {formik.values.benefits.map((_, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={1}
                      sx={{ width: "100%", alignItems: "center" }}
                    >
                      <Field
                        name={fields.benefits.getValuePath(index)}
                        as={AppTextField}
                        placeholder="Короткий опис*"
                        error={getIn(
                          formik.errors,
                          fields.benefits.getValuePath(index),
                        )}
                        sx={{ flex: 1 }}
                      />
                      <DeleteIconButton
                        onClick={() => remove(index)}
                        sx={deleteIconButton}
                      />
                    </Stack>
                  ))}
                </Stack>
              )}
            </FieldArray>
          )}
          <Button
            variant="contained"
            type="submit"
            size="large"
            sx={mainButtonStyles}
            disabled={formik.isSubmitting}
          >
            Зберегти
          </Button>
        </Stack>
      </FormikProvider>
    </Card>
  );
}
