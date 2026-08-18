import Box from "@mui/system/Box";
import Stack, { StackProps } from "@mui/system/Stack";

type ProductBadgesProps = {
  discountPercent?: number;
  isNew?: boolean;
} & StackProps;

export default function ProductBadges({
  discountPercent,
  isNew,
  ...props
}: ProductBadgesProps) {
  return (
    <Stack {...props}>
      {discountPercent !== 0 && (
        <Box
          sx={{
            display: "flex",
            width: "fit-content",
            color: "white",
            bgcolor: "rgb(255, 186, 26)",
            px: 1,
            borderRadius: 2,
          }}
        >
          {/* Гаряча ціна */}
          Hot price
        </Box>
      )}
      {isNew && (
        <Box
          sx={{
            width: "fit-content",
            color: "white",
            bgcolor: "rgb(117, 186, 255)",
            px: 1,
            borderRadius: 2,
          }}
        >
          {/* Новинка */}
          New
        </Box>
      )}
    </Stack>
  );
}
