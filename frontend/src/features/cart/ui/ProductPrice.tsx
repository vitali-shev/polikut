import Stack, { StackProps } from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type ProductPriceProp = {
  originalPrice: number;
  currentPrice: number;
} & StackProps;

export default function ProductPrice({
  originalPrice,
  currentPrice,
  ...props
}: ProductPriceProp) {
  return (
    <Stack {...props} spacing={1} direction="row">
      {currentPrice !== originalPrice && (
        <Typography
          sx={{
            fontSize: 18,
            color: "rgb(117, 117, 117)",
            textDecoration: "line-through",
            textDecorationColor: "rgb(255, 51, 0)",
          }}
        >
          {originalPrice.toLocaleString()}
        </Typography>
      )}
      <Typography sx={{ fontSize: 18 }}>
        {currentPrice.toLocaleString()} грн.
      </Typography>
    </Stack>
  );
}
