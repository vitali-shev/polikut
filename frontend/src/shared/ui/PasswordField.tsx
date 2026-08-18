import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { TextField } from "@mui/material";

export default function PasswordField({ ...props }: TextFieldProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={toggleVisibility}>
        {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <TextField
      type={isVisible ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: endAdornment,
        },
      }}
      {...props}
    />
  );
}
