import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Alert, Snackbar } from "@mui/material";
import {
  hideNotification,
  selectNotification,
} from "@/shared/model/notificationSlice";

export default function GlobalNotification() {
  const { id, open, message, severity } = useAppSelector(selectNotification);

  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(hideNotification());

  return (
    <Snackbar
      key={id}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
