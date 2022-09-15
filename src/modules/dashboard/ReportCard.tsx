import { Avatar, Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { ReportsIcon } from "@/components/icons";
import { formatDate } from "@/utils/format-date";
import { getDocumentNumber } from "@/utils/get-document-number";

import { ReportDto } from "../reports/types";

interface IReportCardProps {
  report: ReportDto
  title: string
}

export const ReportCard = ({ report, title }: IReportCardProps) => {
  const { player, docNumber, id, author, avgRating, createdAt } = report;
  const { t } = useTranslation()

  return (
    <Card sx={{
      margin: '0 auto',
      width: '100%'
    }}>
      <CardActionArea>
        <Link href={`/reports/${id}`} >
          <CardHeader
            avatar={
              <StyledAvatar aria-label="report icon">
                <ReportsIcon />
              </StyledAvatar>
            }
            title={title.toUpperCase()}
            titleTypographyProps={{ variant: 'h6', color: 'textSecondary' }}
            subheader={t('dashboard:REPORT_NO', { number: getDocumentNumber({ docNumber, createdAt }) })}
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('PLAYER')}: </strong>
              {player.firstName} {player.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('SCOUT')}: </strong>
              {author.firstName} {author.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('CREATED_DATE')}: </strong>
              {formatDate(createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('AVG_RATING')}: </strong>
              {avgRating?.toFixed(2) || t('NONE')}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const StyledAvatar = ({ children }: any) => (<Avatar sx={(theme) => ({
  background: theme.palette.secondary.main,
  width: 50,
  height: 50,
})}>{children}</Avatar>)