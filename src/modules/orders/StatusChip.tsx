import { Chip } from "@mui/material";
import { useTranslation } from "next-i18next";

interface IStatusChip {
  status: 'OPEN' | 'ACCEPTED' | 'CLOSED'
}
export const OrderStatusChip = ({ status }: IStatusChip) => {
  const { t } = useTranslation()

  const getColor = (stat: typeof status) => {
    switch (stat) {
      case 'ACCEPTED':
        return 'info'
      case 'CLOSED':
        return 'error'
      case 'OPEN':
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <Chip
      size="small"
      label={t(`orders:${status}`)}
      color={getColor(status)}
    />
  );
};

