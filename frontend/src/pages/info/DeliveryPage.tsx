import SectionTitle from "@/shared/ui/SectionTitle";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function DeliveryPage() {
  return (
    <Stack>
      <Stack spacing={2}>
        <SectionTitle sx={{ fontWeight: "bold", fontSize: 20 }}>
          Способи доставки
        </SectionTitle>
        <Typography>
          Кожен товар ми надійно пакуємо перед відправкою, щоб він дістався до
          вас в ідеальному стані. Оберіть зручний для вас спосіб доставки:
        </Typography>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>
            1. Нова Пошта — Доставка у відділення
          </Typography>
          <Typography>
            Найшвидший варіант — посилка зазвичай приїжджає за 1–2 дні. Вартість
            розраховується за тарифами Нової Пошти. Посилка безкоштовно чекає у
            відділенні 7 днів.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>
            2. Нова Пошта — Доставка у поштомат
          </Typography>
          <Typography>
            Зручний варіант для невеликих посилок із можливістю забрати
            замовлення у будь-який час 24/7. Вартість та ліміти (до 20 кг,
            40×60×30 см) визначаються за тарифами Нової Пошти.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>
            3. Укрпошта — Доставка у відділення
          </Typography>
          <Typography>
            Найдешевший варіант доставки по Україні. Займає трохи більше часу —
            зазвичай від 3 до 6 днів. Розрахунок вартості та терміни зберігання
            — за тарифами Укрпошти.
          </Typography>
        </Stack>
        <Typography>
          <strong>Важливо:</strong> Обов’язково перевіряйте цілісність упаковки
          та самого товару безпосередньо при отриманні у відділенні або біля
          поштомата. У разі виявлення пошкоджень складіть акт разом із
          представником служби доставки.
        </Typography>
      </Stack>
    </Stack>
  );
}
