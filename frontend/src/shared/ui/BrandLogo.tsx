import { routes } from "@/app/router/routes";
import { Box, ButtonBase, ButtonBaseProps, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function BrandLogo({ sx, ...props }: ButtonBaseProps) {
  return (
    <ButtonBase
      component={Link}
      to={routes.HOME}
      sx={{ ml: -0.6, pr: 1, borderRadius: 3, ...sx }}
      {...props}
    >
      <Box
        component="img"
        src="/logo.svg"
        alt="logo"
        sx={{ width: { xs: 50, md: 56 } }}
      />
      <Typography sx={{ fontSize: 28 }}>POLIKUT</Typography>
    </ButtonBase>
  );
}
