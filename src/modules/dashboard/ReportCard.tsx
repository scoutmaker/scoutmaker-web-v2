import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { ReportsIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'
import { getDocumentNumber } from '@/utils/get-document-number'

import { getPlayerFullName } from '../players/utils'
import { ReportDto } from '../reports/types'
import { StyledAvatar } from './StyledAvatar'

interface IReportCardProps {
  report: ReportDto
  title: string
}

export const ReportCard = ({ report, title }: IReportCardProps) => {
  const { player, docNumber, id, author, avgRating, createdAt } = report
  const { t } = useTranslation()

  return (
    <Card
      sx={{
        margin: '0 auto',
        width: '100%',
      }}
    >
      <CardActionArea>
        <Link href={`/reports/${id}`}>
          <CardHeader
            avatar={
              <StyledAvatar aria-label="report icon" secondary>
                <ReportsIcon />
              </StyledAvatar>
            }
            title={title.toUpperCase()}
            titleTypographyProps={{ variant: 'h6', color: 'textSecondary' }}
            subheader={t('dashboard:REPORT_NO', {
              number: getDocumentNumber({ docNumber, createdAt }),
            })}
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('PLAYER')}
            value={getPlayerFullName(player)}
            href={`/players/${player.slug}`}
          />
          <CardItemBasic
            title={t('SCOUT')}
            value={`${author.firstName} ${author.lastName}`}
          />
          <CardItemBasic
            title={t('CREATED_DATE')}
            value={formatDate(createdAt)}
          />
          <CardItemBasic
            title={t('AVG_RATING')}
            value={avgRating?.toFixed(2) || t('NONE')}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}
