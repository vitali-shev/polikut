import { routes } from "@/app/router/routes";
import {
  Collapse,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  listItemIconStyles,
  listItemStyles,
  listStyles,
  nestedListItemStyles,
  subheaderStyles,
} from "@/shared/ui/styles/list";

export default function Navigation() {
  const [productsOpen, setProductsOpen] = useState<boolean>(false);

  return (
    <List
      sx={listStyles}
      subheader={
        <ListSubheader sx={subheaderStyles}>Панель керування</ListSubheader>
      }
    >
      {/* DASHBOARD */}
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to={routes.ADMIN.ROOT}
          sx={listItemStyles}
        >
          <ListItemIcon sx={listItemIconStyles}>
            <Icon>dashboard</Icon>
          </ListItemIcon>
          <ListItemText primary="Інформаційна панель" />
        </ListItemButton>
      </ListItem>

      {/* CATEGORY MANAGEMENT */}
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to={routes.ADMIN.CATEGORIES.path}
          sx={listItemStyles}
        >
          <ListItemIcon sx={listItemIconStyles}>
            <Icon>category</Icon>
          </ListItemIcon>
          <ListItemText primary="Керування категоріями" />
        </ListItemButton>
      </ListItem>

      {/* PRODUCT MANAGEMENT */}
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => setProductsOpen(!productsOpen)}
          sx={listItemStyles}
        >
          <ListItemIcon sx={listItemIconStyles}>
            <Icon>ballot</Icon>
          </ListItemIcon>
          <ListItemText primary="Керування товарами" />

          {productsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      <Collapse in={productsOpen} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItemButton
            component={Link}
            to={routes.ADMIN.PRODUCTS.CREATE.path}
            sx={[listItemStyles, nestedListItemStyles]}
          >
            <ListItemIcon sx={listItemIconStyles}>
              <Icon>add</Icon>
            </ListItemIcon>
            <ListItemText primary="Додати товар" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to={routes.ADMIN.PRODUCTS.EDIT.path}
            sx={[listItemStyles, nestedListItemStyles]}
          >
            <ListItemIcon sx={listItemIconStyles}>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Редагувати товар" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to={routes.ADMIN.PRODUCTS.DELETE.path}
            sx={[listItemStyles, nestedListItemStyles]}
          >
            <ListItemIcon sx={listItemIconStyles}>
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Видалити товар" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* ORDERS */}
      <ListItemButton
        component={Link}
        to={routes.ADMIN.ORDERS.path}
        sx={listItemStyles}
      >
        <ListItemIcon sx={listItemIconStyles}>
          <Icon>add_shopping_cart</Icon>
        </ListItemIcon>
        <ListItemText primary="Замовлення" />
      </ListItemButton>
    </List>
  );
}
