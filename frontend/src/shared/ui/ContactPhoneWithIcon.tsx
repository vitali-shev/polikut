import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ContactPhoneWithIcon({ sx, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
        ...sx,
      }}
    >
      <Box component="img" src="/kyivstar.svg" sx={{ width: 22 }} />
      <Typography sx={{ whiteSpace: "nowrap" }}>067 565-12-16</Typography>
    </Box>
  );
}
