import {
  DirectionsRun as PlayersIcon,
  Info as InfoIcon,
} from '@mui/icons-material'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { getPositionDisplayName } from '@/modules/player-positions/utils'
import { PlayerDto } from '@/modules/players/types'
import { calculateRating } from '@/utils/calculate-rating'
import { FlagEmoji } from '@/utils/get-flag-emoji'

import RoleModal from './role-modal'
import { isPlayerGradeUpToDate } from './utils'

interface IPlayerDetailsCard {
  player: PlayerDto
  showRole?: boolean
}

export const PlayerDetialsCard = ({ player, showRole }: IPlayerDetailsCard) => {
  const { t } = useTranslation(['common', 'players'])
  const [roleModalOpen, setRoleModalOpen] = useState(false)

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
    averagePercentageRating,
    role,
    inStatUrl,
    slug,
    latestGrade,
  } = player

  return (
    <>
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
          action={
            <Link href={`/players/edit/${slug}`}>
              <Button variant="contained">{t('EDIT')}</Button>
            </Link>
          }
        />
        <CardContent>
          <Grid container spacing={1}>
            <CardItemBasic title={t('YEAR_OF_BIRTH')} value={yearOfBirth} />
            <CardItemBasic
              title={t('COUNTRY')}
              value={
                <>
                  <FlagEmoji code={country.code} /> {country.name}
                </>
              }
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
            {showRole && (
              <CardItemBasic
                title={t('PLAYER_ROLE')}
                value={
                  role ? (
                    <>
                      {role.name}{' '}
                      <InfoIcon
                        onClick={() => setRoleModalOpen(true)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </>
                  ) : (
                    '-'
                  )
                }
              />
            )}
            <CardItemBasic
              title={t('players:POTENTIAL')}
              href={
                latestGrade ? `/player-grades/${latestGrade?.id}` : undefined
              }
              value={
                latestGrade && isPlayerGradeUpToDate(latestGrade.createdAt)
                  ? t(`player-grades:${latestGrade.grade}`)
                  : '-'
              }
            />
            <CardItemBasic
              title={t('AVG_RATING')}
              value={
                typeof averagePercentageRating === 'number'
                  ? calculateRating(averagePercentageRating)
                  : '-'
              }
            />
            <CardItemBasic
              title={t('FOOTED')}
              value={footed ? t(footed) : '-'}
            />
            <CardItemBasic
              title={t('WEIGHT')}
              value={weight ? `${weight} kg` : '-'}
            />
            <CardItemBasic
              title={t('HEIGHT')}
              value={height ? `${height} cm` : '-'}
            />
            <CardItemBasic
              title="TransferMarkt"
              value={transfermarktUrl}
              href={transfermarktUrl}
              linkInNewCard
            />
            <CardItemBasic
              title="90minut"
              value={minut90url}
              href={minut90url}
              linkInNewCard
            />
            <CardItemBasic
              title="inStat"
              value={inStatUrl}
              href={inStatUrl}
              linkInNewCard
            />
          </Grid>
        </CardContent>
      </Card>
      <RoleModal
        open={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        role={role}
      />
    </>
  )
}
