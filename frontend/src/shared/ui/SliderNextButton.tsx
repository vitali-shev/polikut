import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export default function SliderNextButton({ sx, ...props }: IconButtonProps) {
  return (
    <IconButton
      {...props}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: 4,
        ...sx,
      }}
    >
      <ChevronRightIcon color="disabled" fontSize="large" />
    </IconButton>
  );
}
