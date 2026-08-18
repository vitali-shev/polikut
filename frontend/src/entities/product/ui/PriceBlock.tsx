import Box from "@mui/material/Box";
import Stack, { StackProps } from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { originalPriceStyle } from "./styles";

type PriceBlockProps = {
  originalPrice: number;
  discountPercent: number;
  currentPrice: number;
} & StackProps;

export default function PriceBlock({
  originalPrice,
  discountPercent,
  currentPrice,
  ...props
}: PriceBlockProps) {
  if (!originalPrice) return;

  return (
    <Stack {...props}>
      {discountPercent !== 0 && (
        <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
          <Typography sx={originalPriceStyle}>
            {originalPrice.toLocaleString("uk-UA")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 1,
              bgcolor: "rgb(255, 51, 0)",
              borderRadius: 3,
              color: "white",
              fontWeight: "bold",
            }}
          >
            -{discountPercent} %
          </Box>
        </Stack>
      )}
      <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
        {currentPrice?.toLocaleString("uk-UA")} грн.
      </Typography>
    </Stack>
  );
}
