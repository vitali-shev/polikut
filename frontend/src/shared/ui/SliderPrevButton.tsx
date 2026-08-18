import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export default function SliderPrevButton({ sx, ...props }: IconButtonProps) {
  return (
    <IconButton
      {...props}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: 4,
        ...sx,
      }}
    >
      <ChevronLeftIcon color="disabled" fontSize="large" />
    </IconButton>
  );
}
