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
      <Box component="img" src="/lifecell.svg" sx={{ width: 22 }} />
      <Typography sx={{ whiteSpace: "nowrap" }}>098 089-03-80</Typography>
    </Box>
  );
}
