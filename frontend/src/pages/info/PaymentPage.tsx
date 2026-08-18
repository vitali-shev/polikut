import SectionTitle from "@/shared/ui/SectionTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function PaymentPage() {
  return (
    <Stack>
      <Stack spacing={2}>
        <SectionTitle sx={{ fontWeight: "bold", fontSize: 20 }}>
          Способи оплати
        </SectionTitle>
        <Typography>
          Обирайте найзручніший для вас спосіб оплати замовлення. Ми гарантуємо
          безпеку всіх транзакцій та захист ваших персональних даних.
        </Typography>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>
            1. Оплата при отриманні (Накладений платіж)
          </Typography>
          <Typography>
            Оплата розраховується готівкою або карткою у відділенні поштової
            служби (Нова Пошта / Укрпошта) після огляду посилки.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>
            2. Онлайн-оплата карткою (Visa / Mastercard)
          </Typography>
          <Typography>
            Швидка та безпечна оплата при оформленні замовлення. Після
            підтвердження платежу ми одразу відправляємо замовлення у чергу на
            виготовлення або пакування.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>
            3. Оплата криптовалютою (USDT)
          </Typography>
          <Typography>
            Сучасний та швидкий спосіб оплати через криптогаманець. Розрахунок
            відбувається за поточним курсом на момент оформлення замовлення, а
            підтвердження зараховується автоматично протягом кількох хвилин.
          </Typography>
        </Stack>
        <Typography>
          <strong>Важливо:</strong> Індивідуальні замовлення (розробка
          3D-моделі, друк за вашими макетами або зміна розмірів) запускаються у
          виробництво лише після часткової (від 50%) або 100% передплати.
        </Typography>
      </Stack>
    </Stack>
  );
}
