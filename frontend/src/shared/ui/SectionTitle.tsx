import { Typography, TypographyProps } from "@mui/material";

export default function SectionTitle({
  children,
  sx,
  ...props
}: TypographyProps) {
  return (
    <Typography
      component="h2"
      variant="h6"
      sx={{
        fontWeight: 400,
        fontSize: {
          xs: 18,
          sm: 22,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
