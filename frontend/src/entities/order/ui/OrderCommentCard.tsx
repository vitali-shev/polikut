import Card, { CardProps } from "@mui/material/Card";
import Typography from "@mui/material/Typography";

type OrderCommentCardProps = {
  title: string;
  comment: string;
} & CardProps;

export default function OrderCommentCard({
  title,
  comment,
  ...props
}: OrderCommentCardProps) {
  return (
    <Card {...props}>
      <Typography gutterBottom sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: 15 }}>{comment}</Typography>
    </Card>
  );
}
