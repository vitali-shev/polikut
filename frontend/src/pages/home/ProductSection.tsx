import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ProductCard as ProductCardModel } from "@/entities/product/model";
import SectionTitle from "@/shared/ui/SectionTitle";
import { cardStyles } from "@/shared/ui/styles/card";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ProductCard from "@/widgets/product-card";

type ProductSectionProps = {
  title: string;
  button: {
    label: string;
    to: string;
  };
  products: ProductCardModel[];
};

export default function ProductSection({
  title,
  button,
  products,
}: ProductSectionProps) {
  return (
    <Card
      sx={[
        cardStyles,
        {
          display: "flex",
          flexDirection: "column",
          gap: 2,
        },
      ]}
    >
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SectionTitle sx={{ fontWeight: 500 }}>{title}</SectionTitle>
        <Button
          component={Link}
          to={button.to}
          variant="outlined"
          endIcon={<KeyboardArrowRightIcon />}
          color="secondary"
          sx={{ fontWeight: "bold", fontSize: { xs: 13, sm: 14 } }}
        >
          {button.label}
        </Button>
      </Stack>
      <Grid container columns={60}>
        {products.map((product) => (
          <Grid
            key={product.id}
            size={{ xs: 30, sm: 20, md: 15, lg: 12, xl: 10 }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
