import { mainButtonStyles } from "@/shared/ui/styles/button";
import Button, { ButtonProps } from "@mui/material/Button";
import { useLogoutMutation } from "./authApi";
import { useAppDispatch } from "@/app/store/hooks";
import { logout } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "@/app/router/routes";
import { baseApi } from "@/shared/api/baseApi";

export default function LogoutButton({
  name,
  sx,
  ...props
}: { name: string } & ButtonProps) {
  const [serverLogout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate(routes.HOME);
    try {
      await serverLogout().unwrap();
    } catch (error) {}
  };

  return (
    <Button
      {...props}
      onClick={handleLogout}
      disabled={isLoading}
      variant="contained"
      size="large"
      color="error"
      sx={[mainButtonStyles, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {name}
    </Button>
  );
}
