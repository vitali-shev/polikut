import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  decrementQuentity,
  incrementQuantity,
  removeFromCart,
  selectCartItems,
  setQuantity,
} from "../model/cartSlice";
import defaultImage from "@/entities/product/assets/default-image.svg";
import { truncateText } from "@/shared/lib/truncateText";
import { Link } from "react-router-dom";
import { routes } from "@/app/router/routes";
import {
  dialogContentPTStyles,
  dialogStyles,
  dialogTitleWithPBStyles,
  iconButtonStyles,
} from "@/shared/ui/styles/dialog";
import DeleteIconButton from "@/shared/ui/DeleteIconButton";
import { rowSpaceBetweenStyles } from "@/shared/ui/styles/stack";
import { useEffect } from "react";
import ProductPrice from "./ProductPrice";

type CartModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartModal({ open, onClose }: CartModalProps) {
  const items = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open && items.length === 0) {
      onClose();
    }
  }, [open, items.length, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: dialogStyles,
        },
      }}
    >
      <Stack sx={rowSpaceBetweenStyles}>
        <DialogTitle sx={dialogTitleWithPBStyles}>Кошик</DialogTitle>
        <IconButton onClick={onClose} sx={iconButtonStyles}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent sx={dialogContentPTStyles}>
        <Stack spacing={1}>
          {items.map((item) => (
            <Stack
              key={item.id}
              sx={{
                flexDirection: "row",
                gap: 1,
                p: 1,
                borderWidth: 1,
                borderColor: "divider",
                borderStyle: "solid",
                borderRadius: 1,
              }}
            >
              <Box
                component="img"
                src={item.thumbnailUrl ?? defaultImage}
                sx={{
                  width: { xs: 75, sm: 130 },
                  height: { xs: 75, sm: 130 },
                  borderRadius: 1,
                }}
              />
              <Stack
                spacing={1}
                sx={{ justifyContent: "space-between", width: "100%" }}
              >
                <Stack spacing={1}>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 2,
                      alignItems: "start",
                    }}
                  >
                    <Typography>{truncateText(item.title, 40)}</Typography>
                    <DeleteIconButton
                      color="default"
                      onClick={() => {
                        dispatch(removeFromCart(item.id));
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontSize: 15, color: "rgb(117, 117, 117)" }}
                    >
                      Код: {item.sku}
                    </Typography>
                    <ProductPrice
                      originalPrice={item.originalPrice}
                      currentPrice={item.currentPrice}
                      sx={{
                        display: { xs: "flex", sm: "none" },
                      }}
                    />
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flex: 1,
                    gap: 1,
                  }}
                >
                  <ProductPrice
                    originalPrice={item.originalPrice}
                    currentPrice={item.currentPrice}
                    sx={{
                      display: { xs: "none", sm: "flex" },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      flex: { xs: 1, sm: "0" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "divider",
                        borderRadius: 5,
                        height: 34,
                        overflow: "hidden",
                      }}
                    >
                      <IconButton
                        disabled={item.quantity <= 1}
                        onClick={() => dispatch(decrementQuentity(item.id))}
                        sx={{ borderRadius: 0 }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Divider orientation="vertical" flexItem />
                      <Input
                        disableUnderline
                        value={item.quantity}
                        onChange={(e) => {
                          let quantity = Number(e.target.value);

                          if (!Number.isNaN(quantity)) {
                            if (quantity < 0) {
                              quantity = 1;
                            }
                            dispatch(
                              setQuantity({
                                id: item.id,
                                quantity,
                              }),
                            );
                          }
                        }}
                        sx={{
                          width: 50,
                          "& input": {
                            textAlign: "center",
                          },
                        }}
                      />
                      <Divider orientation="vertical" flexItem />
                      <IconButton
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        sx={{ borderRadius: 0 }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography
                      sx={{
                        width: { xs: "fit-content", sm: 120 },
                        textAlign: "right",
                        fontSize: 20,
                      }}
                    >
                      {(item.currentPrice * item.quantity).toLocaleString()}{" "}
                      грн.
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack
          spacing={1}
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            pt: 2,
          }}
        >
          <Typography sx={{ fontSize: { xs: 20, sm: 22 } }}>
            Разом:{" "}
            {items
              .reduce((sum, item) => sum + item.quantity * item.currentPrice, 0)
              .toLocaleString()}{" "}
            грн.
          </Typography>
          <Button
            component={Link}
            to={routes.CHECKOUT.path}
            variant="contained"
          >
            Оформити замовлення
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
