import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { LoginForm, LoginModalProps } from "./types";
import PasswordField from "@/shared/ui/PasswordField";
import { useFormik } from "formik";
import { useLoginMutation } from "./authApi";
import { useAppDispatch } from "@/app/store/hooks";
import { showNotification } from "@/shared/model/notificationSlice";
import { dialogStyles, dialogTitleStyles } from "@/shared/ui/styles/dialog";

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const formik = useFormik<LoginForm>({
    initialValues: { username: "", password: "" },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        await login(values).unwrap();
        dispatch(
          showNotification({
            message: "Успішний вхід",
            severity: "success",
          }),
        );
        onClose();
      } catch (error) {}
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: [dialogStyles, { maxWidth: 400 }],
        },
      }}
    >
      <DialogTitle sx={dialogTitleStyles}>Панель керування</DialogTitle>
      <DialogContent>
        <Typography sx={{ textAlign: "center" }}>
          Введіть свої облікові дані для доступу до системи.
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1.5 }}
        >
          <TextField
            name="username"
            label="Ідентифікатор"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <PasswordField
            name="password"
            label="Пароль"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{
              height: 56,
              fontWeight: "bold",
              fontSize: 18,
              textTransform: "none",
            }}
          >
            Увійти
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
