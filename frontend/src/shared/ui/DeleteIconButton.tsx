import { IconButton, IconButtonProps } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function DeleteIconButton(props: IconButtonProps) {
  return (
    <IconButton color="error" {...props}>
      <DeleteOutlineOutlinedIcon />
    </IconButton>
  );
}
