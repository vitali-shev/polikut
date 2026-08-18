import { useGetCategoriesQuery } from "@/entities/category/api";
import { useGetProductCardsQuery } from "@/entities/product/api";
import DesktopCategoriesNavigation from "@/widgets/categories-navigation/DesktopCategoriesNavigation";
import SectionTitle from "@/shared/ui/SectionTitle";
import ProductCard from "@/widgets/product-card";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { PRODUCT_PARAMS } from "@/entities/product/model/constants/params";
import { PRODUCT_SORT_OPTIONS } from "@/entities/product/model/constants/sortOptions";
import { ProductQueryParams } from "@/entities/product/model";
import CategoriesNavigation from "@/widgets/categories-navigation/CategoriesNavigation";

const SORT_SELECT_OPTIONS = [
  { value: PRODUCT_SORT_OPTIONS.NEWEST, label: "Спочатку нові" },
  { value: PRODUCT_SORT_OPTIONS.PRICE_ASC, label: "Від дешевих до дорогих" },
  { value: PRODUCT_SORT_OPTIONS.PRICE_DESC, label: "Від дорогих до дешевих" },
];

export default function CatalogPage() {
  const { data: categories = [] } = useGetCategoriesQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get(PRODUCT_PARAMS.categoryId);

  const params: ProductQueryParams = {
    [PRODUCT_PARAMS.categoryId]: categoryId ? Number(categoryId) : undefined,
    [PRODUCT_PARAMS.page]: Number(searchParams.get(PRODUCT_PARAMS.page) ?? 0),
    [PRODUCT_PARAMS.size]: Number(searchParams.get(PRODUCT_PARAMS.size) ?? 30),
    [PRODUCT_PARAMS.sort]: searchParams.get(PRODUCT_PARAMS.sort) || undefined,
    [PRODUCT_PARAMS.discount]:
      searchParams.get(PRODUCT_PARAMS.discount) === "true",
  };

  const selectedSortLabel =
    SORT_SELECT_OPTIONS.find((o) => o.value === params.sort)?.label ??
    "Рекомендації";

  const { data } = useGetProductCardsQuery(params);

  if (!data) return null;

  const onSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(PRODUCT_PARAMS.sort, value);
    params.set(PRODUCT_PARAMS.page, "0");

    setSearchParams(params);
  };

  const onPageChange = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(PRODUCT_PARAMS.page, String(value - 1));

    setSearchParams(params);
  };

  const onDiscountChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams);

    checked
      ? params.set(PRODUCT_PARAMS.discount, "true")
      : params.delete(PRODUCT_PARAMS.discount);

    params.set(PRODUCT_PARAMS.page, "0");
    setSearchParams(params);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <CategoriesNavigation />
      </Box>
      <Stack spacing={2} sx={{ display: { xs: "none", md: "block" } }}>
        <DesktopCategoriesNavigation />
        <Divider sx={{ borderColor: "divider" }} />
        <FormControlLabel
          control={
            <Checkbox
              checked={params.discount}
              onChange={(e) => onDiscountChange(e.target.checked)}
            />
          }
          label="Товари зі знижкою"
        />
      </Stack>
      <Stack sx={{ width: "100%" }} direction="column">
        <Stack
          spacing={1}
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            pb: { md: 1 },
          }}
        >
          <SectionTitle sx={{ fontWeight: 500 }}>
            {categories.find((category) => category.id === params.categoryId)
              ?.name || "Всі товари"}
          </SectionTitle>
          <Select
            sx={{
              height: 34,
              width: { xs: 150, sm: 225 },
              borderRadius: 2,
              fontSize: 15,
            }}
            displayEmpty
            value={params.sort || ""}
            renderValue={() => selectedSortLabel}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {SORT_SELECT_OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ fontSize: 15 }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <FormControlLabel
          sx={{ display: { xs: "block", md: "none" } }}
          control={
            <Checkbox
              checked={params.discount}
              onChange={(e) => onDiscountChange(e.target.checked)}
            />
          }
          label="Товари зі знижкою"
        />
        {data?.content.length === 0 ? (
          <Stack>
            <Typography sx={{ textAlign: "center" }}>
              Список порожній
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              Спробуйте обрати іншу категорію або змінити фільтри пошуку.
            </Typography>
          </Stack>
        ) : (
          <>
            <Grid container columns={60}>
              {data?.content.map((product) => (
                <Grid
                  key={product.id}
                  size={{ xs: 30, sm: 20, md: 20, lg: 15, xl: 12 }}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
            <Pagination
              variant="outlined"
              shape="rounded"
              size="large"
              color="primary"
              count={data?.page.totalPages}
              page={data?.page?.number + 1}
              onChange={(_, value) => onPageChange(value)}
              sx={{ mt: "auto", pt: 2, alignSelf: "center" }}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
}
