import SectionTitle from "@/shared/ui/SectionTitle";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useSearchSettlementsQuery,
  useSearchWarehousesQuery,
  useCreateOrderMutation,
  orderApi,
} from "@/entities/order/api";
import CheckoutItems from "./ui/CheckoutItems";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { clearCart, selectCartItems } from "@/features/cart/model/cartSlice";
import { CheckoutForm, OrderCreateRequest } from "@/entities/order/model";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showNotification } from "@/shared/model/notificationSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "@/app/router/routes";
import PhoneMask from "@/shared/ui/PhoneMask";
import { PaymentMethod } from "@/entities/order/model/enums/paymentMethod";
import { DeliveryMethod } from "@/entities/order/model/enums/deliveryMethods";
import { containerStyles } from "@/shared/ui/styles/container";

const steps = [
  { label: "Дані отримувача" },
  { label: "Доставка" },
  { label: "Оплата" },
];

const stepFields = [
  ["fullName", "phoneNumber"],
  [
    "deliveryMethod",
    "settlement",
    "novaPoshtaBranch",
    "novaPoshtaPostomat",
    "ukrposhtaAddress",
  ],
];

const initialValues: CheckoutForm = {
  fullName: "",
  phoneNumber: "",
  comment: "",
  settlement: null,
  deliveryMethod: null,
  novaPoshtaBranch: null,
  novaPoshtaPostomat: null,
  ukrposhtaAddress: "",
  paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
};

export default function CheckoutPage() {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .trim()
      .required("Будь ласка, заповніть це поле")
      .test(
        "fullname-check",
        "Введіть ім'я та прізвище, наприклад: Віталій Шевченко",
        (value) => {
          const words = value.split(/\s+/);
          return words.length === 2;
        },
      ),
    phoneNumber: Yup.string()
      .trim()
      .required("Будь ласка, заповніть це поле")
      .transform((value) => value.replace(/\D/g, ""))
      .length(12, "Введіть коректний номер, наприклад: +380 (67) 123 45 67"),
    deliveryMethod: Yup.string().nullable().required("Оберіть спосіб доставки"),
    settlement: Yup.object().nullable().required(),
    novaPoshtaBranch: Yup.object()
      .nullable()
      .when("deliveryMethod", {
        is: "NOVA_POSHTA_BRANCH",
        then: (schema) => schema.required(),
      }),
    novaPoshtaPostomat: Yup.object()
      .nullable()
      .when("deliveryMethod", {
        is: "NOVA_POSHTA_POSTOMAT",
        then: (schema) => schema.required(),
      }),
    ukrposhtaAddress: Yup.string()
      .trim()
      .when("deliveryMethod", {
        is: "UKRPOSHTA",
        then: (schema) => schema.required(),
      }),
  });

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNextStep = async () => {
    const fields = stepFields[activeStep];
    let isStepValid = true;

    for (const field of fields) {
      try {
        await validationSchema.validateAt(field, formik.values);
        formik.setFieldError(field, undefined);
      } catch (error: any) {
        isStepValid = false;
        formik.setFieldError(field, error.message);
      }
    }

    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValues) => {
      if (cartItems.length === 0) {
        dispatch(
          showNotification({
            message:
              "Ваш кошик порожній. Перейдіть до покупок, щоб обрати бажані товари.",
            severity: "error",
          }),
        );
        return;
      }

      const warehouse =
        formValues.deliveryMethod === DeliveryMethod.NOVA_POSHTA_BRANCH
          ? formValues.novaPoshtaBranch
          : formValues.novaPoshtaPostomat;

      const { novaPoshtaBranch, novaPoshtaPostomat, ...restFormValues } =
        formValues;

      const order: OrderCreateRequest = {
        ...restFormValues,
        novaPoshtaWarehouse: warehouse,
        productItems: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };

      const orderResponse = await createOrder(order).unwrap();
      dispatch(
        orderApi.util.upsertQueryData(
          "getOrderDetails",
          orderResponse.id,
          orderResponse,
        ),
      );
      dispatch(clearCart());
      navigate(routes.CHECKOUT.SUCCESS.getPath(orderResponse.id));
    },
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const { data: settlements = [] } = useSearchSettlementsQuery(
    debouncedSearch,
    { skip: debouncedSearch.length < 3 },
  );

  const { data: warehouses = [] } = useSearchWarehousesQuery(
    formik.values.settlement?.ref ?? "",
    {
      skip: !formik.values.settlement?.ref,
    },
  );

  const cartItems = useAppSelector(selectCartItems);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  return (
    <Container maxWidth="md" sx={[containerStyles]}>
      <SectionTitle sx={{ fontSize: 28, pb: 1 }}>
        Оформлення замовлення
      </SectionTitle>
      <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
        <Stepper
          component="form"
          onSubmit={formik.handleSubmit}
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            minWidth: { xs: "fit-content", md: 500 },
            height: "fit-content",
          }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography>{step.label}</Typography>
              </StepLabel>
              <StepContent>
                {index === 0 && (
                  <Stack sx={{ pt: 1, gap: 2, width: "100%" }}>
                    <TextField
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      label="Ім'я та прізвище"
                      error={!!formik.errors.fullName}
                      helperText={formik.errors.fullName}
                      size="small"
                    />
                    <TextField
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      label="Номер телефону"
                      error={!!formik.errors.phoneNumber}
                      helperText={formik.errors.phoneNumber}
                      slotProps={{
                        input: {
                          inputComponent: PhoneMask,
                        },
                      }}
                      size="small"
                    />
                  </Stack>
                )}

                {index === 1 && (
                  <Stack sx={{ pt: 1 }}>
                    <Stack spacing={0.5}>
                      <Typography sx={{ fontSize: 15 }}>
                        Ваш населений пункт (наприклад:
                        <strong> Київ</strong>)
                      </Typography>
                      <Autocomplete
                        value={formik.values.settlement}
                        options={settlements}
                        open={search.length > 2}
                        noOptionsText="Збігів не знайдено"
                        getOptionLabel={(option) => option.displayName}
                        getOptionKey={(option) => option.ref}
                        onInputChange={(_, value) => setSearch(value)}
                        onChange={(_, settlement) => {
                          formik.setFieldValue("settlement", settlement);
                          formik.setFieldError("settlement", undefined);
                          formik.setFieldError("deliveryMethod", undefined);
                          setSearch("");
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="settlement"
                            placeholder="Почніть вводити для пошуку..."
                            error={!!formik.errors.settlement}
                            size="small"
                          />
                        )}
                      />
                    </Stack>
                    {formik.values.settlement && (
                      <FormControl sx={{ pt: 8 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <FormLabel sx={{ pb: 1, fontWeight: "bold" }}>
                            Спосіб доставки
                          </FormLabel>
                          {formik.errors.deliveryMethod && (
                            <FormHelperText error>
                              ({formik.errors.deliveryMethod})
                            </FormHelperText>
                          )}
                        </Box>

                        <RadioGroup
                          value={formik.values.deliveryMethod}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "deliveryMethod",
                              e.target.value,
                            )
                          }
                        >
                          <FormControlLabel
                            value="NOVA_POSHTA_BRANCH"
                            control={<Radio />}
                            label="У відділення або пункт видачі Нової Пошти"
                          />
                          {formik.values.deliveryMethod ===
                            "NOVA_POSHTA_BRANCH" && (
                            <Autocomplete
                              value={formik.values.novaPoshtaBranch}
                              options={warehouses.filter(
                                (w) => w.categoryOfWarehouse !== "Postomat",
                              )}
                              noOptionsText="Збігів не знайдено"
                              getOptionLabel={(option) => option.description}
                              getOptionKey={(option) => option.ref}
                              onChange={(_, warehouse) => {
                                formik.setFieldValue(
                                  "novaPoshtaBranch",
                                  warehouse,
                                );
                                formik.setFieldError(
                                  "novaPoshtaBranch",
                                  undefined,
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="novaPoshtaBranch"
                                  label="Оберіть відділення/пункт видачі"
                                  error={!!formik.errors.novaPoshtaBranch}
                                  size="small"
                                />
                              )}
                              sx={{ my: 1, ml: 2 }}
                            />
                          )}
                          <FormControlLabel
                            value="NOVA_POSHTA_POSTOMAT"
                            control={<Radio />}
                            label="Доставка у поштомат Нової Пошти"
                          />
                          {formik.values.deliveryMethod ===
                            "NOVA_POSHTA_POSTOMAT" && (
                            <Autocomplete
                              value={formik.values.novaPoshtaPostomat}
                              options={warehouses.filter(
                                (w) => w.categoryOfWarehouse === "Postomat",
                              )}
                              noOptionsText="Збігів не знайдено"
                              getOptionLabel={(option) => option.description}
                              getOptionKey={(option) => option.ref}
                              onChange={(_, warehouse) => {
                                formik.setFieldValue(
                                  "novaPoshtaPostomat",
                                  warehouse,
                                );
                                formik.setFieldError(
                                  "novaPoshtaPostomat",
                                  undefined,
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="novaPoshtaPostomat"
                                  label="Оберіть поштомат"
                                  error={!!formik.errors.novaPoshtaPostomat}
                                  size="small"
                                />
                              )}
                              sx={{ my: 1, ml: 2 }}
                            />
                          )}
                          <FormControlLabel
                            value="UKRPOSHTA"
                            control={<Radio />}
                            label="Доставка у відділення Укрпошти"
                          />
                          {formik.values.deliveryMethod === "UKRPOSHTA" && (
                            <Stack sx={{ my: 1, ml: 2, gap: 0.5 }}>
                              <Typography sx={{ fontSize: 15 }}>
                                Вкажіть адресу відділення <br />
                                (наприклад:
                                <strong> вул. Хрещатик, 22 </strong>
                                або індекс <strong>01001</strong>)
                              </Typography>
                              <TextField
                                name="ukrposhtaAddress"
                                placeholder="Введіть 5-значний індекс або адресу"
                                value={formik.values.ukrposhtaAddress}
                                onChange={formik.handleChange}
                                error={!!formik.errors.ukrposhtaAddress}
                                size="small"
                              />
                            </Stack>
                          )}
                        </RadioGroup>
                      </FormControl>
                    )}
                  </Stack>
                )}

                {index === 2 && (
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel sx={{ py: 1, fontWeight: "bold" }}>
                      Спосіб оплати
                    </FormLabel>
                    <RadioGroup
                      value={formik.values.paymentMethod}
                      onChange={(e) =>
                        formik.setFieldValue("paymentMethod", e.target.value)
                      }
                    >
                      <FormControlLabel
                        value="CASH_ON_DELIVERY"
                        control={<Radio />}
                        label="При отриманні товару (післяплата)"
                      />
                      <FormControlLabel
                        value="CARD_TRANSFER"
                        control={<Radio />}
                        label="Банківський переказ"
                      />
                      {formik.values.paymentMethod === "CARD_TRANSFER" && (
                        <Typography sx={{ ml: 2, fontSize: 15 }}>
                          Після оформлення замовлення наш менеджер зв'яжеться з
                          вами для надання реквізитів на оплату.
                        </Typography>
                      )}
                    </RadioGroup>
                    <FormLabel sx={{ py: 1, fontWeight: "bold" }}>
                      Коментар до замовлення (за бажанням)
                    </FormLabel>
                    <TextField
                      name="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                      multiline
                      rows={4}
                      helperText={`${formik.values.comment.length}/250`}
                      size="small"
                      slotProps={{
                        htmlInput: {
                          maxLength: 250,
                        },
                      }}
                    />
                  </FormControl>
                )}

                <Box sx={{ display: "flex", gap: 1, pt: 2 }}>
                  {index > 0 && (
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep((prev) => prev - 1)}
                    >
                      Назад
                    </Button>
                  )}
                  {index === 2 ? (
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => setActiveStep((prev) => prev + 1)}
                      disabled={isLoading}
                    >
                      Оформити
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={handleNextStep}>
                      Далі
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <Divider orientation="vertical" flexItem />
        <CheckoutItems items={cartItems} />
      </Stack>
    </Container>
  );
}
