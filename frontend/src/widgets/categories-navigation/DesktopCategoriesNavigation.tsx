import { routes } from "@/app/router/routes";
import { useGetCategoriesQuery } from "@/entities/category/api";
import {
  listItemIconStyles,
  listItemStyles,
  listStyles,
  subheaderStyles,
} from "@/shared/ui/styles/list";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";

export default function DesktopCategoriesNavigation() {
  const { data: categories = [] } = useGetCategoriesQuery();

  return (
    <List
      sx={listStyles}
      subheader={
        <ListSubheader sx={subheaderStyles}>Каталог товарів</ListSubheader>
      }
    >
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to={routes.PRODUCTS.path}
          sx={listItemStyles}
        >
          <ListItemIcon sx={listItemIconStyles}>
            <Icon>apps</Icon>
          </ListItemIcon>
          <ListItemText primary="Всі товари" />
        </ListItemButton>
      </ListItem>
      {categories.map((category) => (
        <ListItem key={category.name} disablePadding>
          <ListItemButton
            component={Link}
            to={routes.PRODUCTS.byCategory(category.id)}
            sx={listItemStyles}
          >
            <ListItemIcon sx={listItemIconStyles}>
              <Icon>{category.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
