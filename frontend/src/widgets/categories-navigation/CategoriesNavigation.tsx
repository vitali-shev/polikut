import { routes } from "@/app/router/routes";
import { useGetCategoriesQuery } from "@/entities/category/api";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function CategoriesNavigation() {
  const { data: categories = [] } = useGetCategoriesQuery();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: { xs: "start", sm: "center" },
        bgcolor: "#c1e7ff",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <ButtonBase
        component={Link}
        to={routes.PRODUCTS.path}
        sx={{
          justifyContent: { xs: "start", md: "center" },
          width: { xs: "50%", sm: "auto" },
          gap: 0.5,
          py: 1.5,
          px: { xs: 1, md: 3 },
          transition: "ease-in-out 0.2s",
          "&:hover": {
            bgcolor: "#e1f2fd",
          },
        }}
      >
        <Icon>apps</Icon>
        <Typography>Всі товари</Typography>
      </ButtonBase>
      {categories.map((category) => (
        <ButtonBase
          key={category.id}
          component={Link}
          to={routes.PRODUCTS.byCategory(category.id)}
          sx={{
            justifyContent: { xs: "start", md: "center" },
            width: { xs: "50%", sm: "auto" },
            gap: 0.5,
            py: 1.5,
            px: { xs: 1, md: 3 },
            transition: "ease-in-out 0.2s",
            "&:hover": {
              bgcolor: "#ecf8ff",
            },
          }}
        >
          <Icon>{category.icon}</Icon>
          <Typography>{category.name}</Typography>
        </ButtonBase>
      ))}
    </Box>
  );
}
