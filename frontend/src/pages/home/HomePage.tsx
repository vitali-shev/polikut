import CategoriesNavigation from "@/widgets/categories-navigation/CategoriesNavigation";
import wall1 from "./assets/wall1.jpg";
import wall2 from "./assets/wall2.jpg";
import wall3 from "./assets/wall3.jpg";
import wall4 from "./assets/wall4.jpg";

import { Stack } from "@mui/material";
import DiscountedProductsSection from "./DiscountedProductsSection";
import NewProductsSection from "./NewProductsSection";
import WallSlider from "./WallSlider";

export default function HomePage() {
  return (
    <Stack sx={{ width: "100%", gap: 2 }}>
      <CategoriesNavigation />
      <Stack spacing={2} direction="row">
        <WallSlider images={[wall1, wall2]} />
        <WallSlider
          images={[wall3, wall4]}
          sx={{ display: { xs: "none", md: "block" } }}
        />
      </Stack>
      <DiscountedProductsSection />
      <WallSlider
        images={[wall3, wall4]}
        sx={{ display: { xs: "block", md: "none" } }}
      />
      <NewProductsSection />
    </Stack>
  );
}
