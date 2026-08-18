import Stack from "@mui/material/Stack";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type InfoTooltipProps = {
  title: string;
  description: string;
} & Omit<TooltipProps, "title" | "children">;

export default function InfoTooltip({
  title,
  description,
  ...props
}: InfoTooltipProps) {
  return (
    <Tooltip
      {...props}
      arrow
      title={
        <Stack sx={{ gap: 1 }}>
          <Typography sx={{ fontSize: 13 }}>{title}</Typography>
          <Typography sx={{ fontSize: 11 }}>{description}</Typography>
        </Stack>
      }
    >
      <InfoOutlinedIcon fontSize="small" color="action" />
    </Tooltip>
  );
}
