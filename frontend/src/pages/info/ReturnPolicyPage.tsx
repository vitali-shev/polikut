import SectionTitle from "@/shared/ui/SectionTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ReturnPolicyPage() {
  return (
    <Stack>
      <Stack spacing={2}>
        <SectionTitle sx={{ fontWeight: "bold", fontSize: 20 }}>
          Умови повернення
        </SectionTitle>
        <Typography>
          Ви можете повернути або обміняти товар протягом 14 днів з моменту
          купівлі або отримання замовлення.
        </Typography>
        <Typography sx={{ fontWeight: "bold" }}>
          Поверненню підлягають товари, якщо:
        </Typography>
        <Typography component="ul">
          <li>
            ви виявили дефекти виробництва, деформацію або некоректне складання;
          </li>
          <li>
            комплектація, колір або розмір виробу не відповідають замовленим;
          </li>
          <li>товар пошкоджено під час транспортування поштовою службою;</li>
          <li>отриманий товар не відповідає опису чи фото на сайті.</li>
        </Typography>
        <Typography>
          <strong>Важливо:</strong> Товар не повинен мати слідів використання,
          механічних пошкоджень або спроб самостійного модифікування
          (шліфування, фарбування тощо). Обов'язково має бути збережено
          оригінальну упаковку, товарний чек (або видаткову накладну).
        </Typography>
      </Stack>
    </Stack>
  );
}
