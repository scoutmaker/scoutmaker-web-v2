import { DirectionsRun as PlayersIcon } from '@mui/icons-material'
import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { getPositionDisplayName } from '@/modules/player-positions/utils'
import { PlayerDto } from '@/modules/players/types'
import { getFlagEmoji } from '@/utils/get-flag-emoji'

interface IPlayerDetailsCard {
  player: PlayerDto
}

export const PlayerDetialsCard = ({ player }: IPlayerDetailsCard) => {
  const { t } = useTranslation(['common', 'players'])

  const {
    firstName,
    lastName,
    yearOfBirth,
    height,
    weight,
    footed,
    minut90url,
    transfermarktUrl,
    country,
    primaryPosition,
    secondaryPositions,
    teams,
  } = player

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="player avatar"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <PlayersIcon />
          </Avatar>
        }
        title={`${firstName} ${lastName}`}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('YEAR_OF_BIRTH')} value={yearOfBirth} />
          <CardItemBasic
            title={t('COUNTRY')}
            value={`${getFlagEmoji(country.code)} ${country.name}`}
          />
          <CardItemBasic
            title={t('TEAM')}
            value={teams[0]?.team.name}
            href={teams[0] ? `/teams/${teams[0].team.slug}` : undefined}
          />
          <CardItemBasic
            title={t('POSITION')}
            value={getPositionDisplayName(primaryPosition)}
          />
          <CardItemBasic
            title={t('SECONDARY_POSITIONS')}
            value={secondaryPositions.map(getPositionDisplayName).join(', ')}
          />
          <CardItemBasic title={t('FOOTED')} value={t(footed)} />
          <CardItemBasic
            title={t('WEIGHT')}
            value={weight ? `${weight} kg` : '-'}
          />
          <CardItemBasic
            title={t('HEIGHT')}
            value={height ? `${height} cm` : '-'}
          />
          <CardItemBasic
            title={t('TRANSFERMARKT_URL')}
            value={transfermarktUrl}
            href={transfermarktUrl}
          />
          <CardItemBasic
            title={t('90_MINUT_URL')}
            value={minut90url}
            href={minut90url}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}
