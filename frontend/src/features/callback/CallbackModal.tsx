import Dialog from "@mui/material/Dialog";
import { CallbackForm, CallbackModalProps } from "./types";
import {
  dialogStyles,
  dialogTitleStyles,
  iconButtonStyles,
} from "@/shared/ui/styles/dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import AppTextField from "@/shared/ui/AppTextField";
import PhoneMask from "@/shared/ui/PhoneMask";
import Stack from "@mui/material/Stack";
import { mainButtonStyles } from "@/shared/ui/styles/button";
import Button from "@mui/material/Button";
import PhoneIcon from "@mui/icons-material/Phone";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { useSendCallbackMutation } from "./callbackApi";
import { useAppDispatch } from "@/app/store/hooks";
import { showNotification } from "@/shared/model/notificationSlice";
import { validationSchema } from "./validation";
import { getFirstFormError } from "@/shared/lib/form/getFirstError";
import { Alert } from "@mui/material";

export default function CallbackModal({
  open,
  onClose,
  productTitle,
}: CallbackModalProps) {
  const [sendCallback, { isLoading }] = useSendCallbackMutation();
  const dispatch = useAppDispatch();

  const formik = useFormik<CallbackForm>({
    initialValues: { phoneNumber: "", comment: "" },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        await sendCallback({ ...values, productTitle }).unwrap();
        dispatch(
          showNotification({
            message: "Запит надіслано. Очікуйте на дзвінок!",
            severity: "success",
          }),
        );
      } catch (error) {}
    },
  });

  const firstErrorMessage = getFirstFormError(formik.errors);

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
      <IconButton
        onClick={onClose}
        sx={[iconButtonStyles, { alignSelf: "end" }]}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle sx={[dialogTitleStyles, { pt: 0, mt: -2 }]}>
        Передзвоніть мені
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ textAlign: "center" }}>
          Залиште свій номер телефону, і ми зателефонуємо вам протягом 10
          хвилин.
        </Typography>
        <Stack
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ gap: 2.5, pt: 1.5 }}
        >
          <Stack spacing={0.5}>
            {firstErrorMessage && (
              <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
                {firstErrorMessage}
              </Alert>
            )}
            <Typography>
              Номер телефону <span style={{ color: "red" }}>*</span>
            </Typography>
            <AppTextField
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={!!formik.errors.phoneNumber}
              slotProps={{
                input: {
                  inputComponent: PhoneMask,
                },
              }}
            />
          </Stack>
          <Stack spacing={0.5}>
            <Typography>Коментар (необов'язково)</Typography>
            <AppTextField
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
              placeholder="Ваше питання..."
              multiline
              rows={4}
              helperText={`${formik.values.comment.length}/250`}
              slotProps={{
                htmlInput: {
                  maxLength: 250,
                },
              }}
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            startIcon={<PhoneIcon />}
            sx={mainButtonStyles}
            disabled={isLoading}
          >
            Замовити дзвінок
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
