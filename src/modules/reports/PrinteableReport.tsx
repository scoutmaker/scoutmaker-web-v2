import {
  Box,
  Divider as MuiDivider,
  Link as MuiLink,
  styled,
  Theme,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { Fragment, useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

import { RatingChip } from '@/components/rating-chip/rating-chip'
import { formatDate } from '@/utils/format-date'
import { getDocumentNumber } from '@/utils/get-document-number'

import { MatchDto } from '../matches/types'
import { PlayerDto } from '../players/types'
import { SkillsChart } from './components/skillsChart'
import { SkillsPrintSection } from './components/skillsPrintSection'
import { ReportDto } from './types'
import { groupSkillsByCategory } from './utils'

interface IProps {
  report: ReportDto
  player: PlayerDto
  match?: MatchDto
}
export const PrinteableReport = ({ report, player, match }: IProps) => {
  const { t } = useTranslation()
  const [qrCodeUrl, setqQCodeUrl] = useState('')

  const {
    id,
    docNumber,
    meta,
    shirtNo,
    finalRating,
    author,
    createdAt,
    skills,
    assists,
    minutesPlayed,
    goals,
    summary,
    maxRatingScore,
    avgRating,
    percentageRating,
    redCards,
    yellowCards,
  } = report
  const {
    team: metaTeam,
    position: metaPosition,
    competition: metaCompetition,
  } = meta || {}

  const team = metaTeam || player.teams[0]?.team
  const competition = metaCompetition || match?.competition

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.origin
      setqQCodeUrl(`${hostname}/reports/${id}`)
    }
  }, [])

  const marginLeft = (theme: Theme) => ({
    marginLeft: theme.spacing(2),
  })

  const isAnySkillRated = skills.some(
    skill => typeof skill?.rating === 'number',
  )

  const getMatchText = () => {
    if (!match) return '-'
    const { awayTeam, homeTeam, homeGoals, awayGoals } = match
    let txt = `${homeTeam.name} vs ${awayTeam.name}`
    if (competition) txt += `, ${competition.name}`
    if (homeGoals && awayGoals) txt += ` (${homeGoals} - ${awayGoals})`

    return txt
  }

  return (
    <Container>
      <header>
        <QRCode value={qrCodeUrl} size={64} />
        <Title variant="h6" gutterBottom>
          {t('report-print:TITLE', {
            doc: getDocumentNumber({ docNumber, createdAt }),
          })}
        </Title>
      </header>
      <Flex as="section">
        <div>
          <Text gutterBottom>
            <strong>{t('PLAYER')}: </strong>
            {player.firstName} {player.lastName}, ur. {player.yearOfBirth}
          </Text>
          <Text gutterBottom>
            <strong>{t('TEAM')}: </strong>
            {team
              ? `${team.name} ${competition ? `(${competition.name})` : ''}`
              : '-'}
          </Text>
          <Text gutterBottom>
            <strong>
              {metaPosition
                ? `${t('report-print:POSITIONS')}: `
                : `${t('PRIMARY_POSITION')} `}
            </strong>
            {`${player.primaryPosition.name}${
              metaPosition ? ` / ${metaPosition?.name}` : ''
            }`}
          </Text>
          <Text gutterBottom>
            <strong>{t('SHIRT_NO')}: </strong>
            {shirtNo || 'N/A'}
          </Text>
          <Flex>
            <Text gutterBottom>
              <strong>{t('FOOTED')}: </strong>
              {t(player.footed)}
            </Text>
            <Text sx={marginLeft} gutterBottom>
              <strong>
                {t('HEIGHT')} / {t('WEIGHT')}:{' '}
              </strong>
              {player.height} cm / {player.weight} kg
            </Text>
          </Flex>
          <Text gutterBottom>
            <strong>{t('MATCH')}: </strong>
            {getMatchText()}
          </Text>
          <Text gutterBottom>
            <strong>{t('MATCH_DATE')}: </strong>
            {match ? formatDate(match?.date) : '-'}
          </Text>
          <Flex>
            <Text gutterBottom>
              <strong>{t('SCOUT')}: </strong>
              {author.firstName} {author.lastName}
            </Text>
            <Text sx={marginLeft} gutterBottom>
              <strong>{t('CREATED_AT')}: </strong>
              {formatDate(createdAt)}
            </Text>
          </Flex>
          <Flex>
            <Text gutterBottom>
              <strong>{t('MINUTES_PLAYED')}: </strong>
              {minutesPlayed}
            </Text>
            <Text sx={marginLeft} gutterBottom>
              <strong>{t('GOALS')}: </strong>
              {goals}
            </Text>
            <Text sx={marginLeft} gutterBottom>
              <strong>{t('ASSISTS')}: </strong>
              {assists}
            </Text>
            <Text sx={marginLeft} gutterBottom>
              <strong>{t('YELLOW_CARDS')}: </strong>
              {yellowCards}
            </Text>
            <Text sx={marginLeft} gutterBottom>
              <strong>{t('RED_CARDS')}: </strong>
              {redCards}
            </Text>
          </Flex>
          <Text gutterBottom>
            <strong>{t('90_MINUT_URL')}: </strong>
            <Link
              href={player?.minut90url || ''}
              text={player?.minut90url || '-'}
            />
          </Text>
          <Text gutterBottom>
            <strong>{t('TRANSFERMARKT_URL')}: </strong>
            <Link
              href={player?.transfermarktUrl || ''}
              text={player?.transfermarktUrl || '-'}
            />
          </Text>
        </div>
        <div>
          {isAnySkillRated && (
            <SkillsChart
              skills={skills.filter(skill => typeof skill.rating === 'number')}
              maxRatingScore={report.maxRatingScore}
            />
          )}
        </div>
      </Flex>
      <Divider />
      {Object.entries(groupSkillsByCategory(skills)).map(([key, value]) => (
        <Fragment key={key}>
          <SkillsPrintSection
            category={key}
            maxRatingScore={maxRatingScore}
            skills={value || []}
          />
          <Divider />
        </Fragment>
      ))}
      <section>
        <Heading variant="h6" align="center">
          {t('reports:SUMMARY')}
        </Heading>
        <Text align="center" gutterBottom>
          {t('reports:AVERAGE_RATING')}: {avgRating?.toFixed(2) || t('NONE')}
          {percentageRating ? ` (${percentageRating.toFixed(1)}%)` : ''}
        </Text>
        <Text gutterBottom>{summary}</Text>
        <Flex>
          <Text>
            <strong>{t('reports:FINAL_RATING')}: </strong>
            {finalRating === undefined && t('NONE')}
          </Text>
          {finalRating !== undefined && (
            <Box sx={marginLeft}>
              <RatingChip rating={finalRating} printeable />
            </Box>
          )}
        </Flex>
      </section>
    </Container>
  )
}

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 4),
}))

const Title = styled(Typography)({
  fontSize: 16,
  fontWeight: 700,
})

const Heading = styled(Typography)({
  fontSize: 14,
  fontWeight: 700,
})

const Text = styled(Typography)({
  fontSize: 10,
})

const Flex = styled('div')({
  display: 'flex',
  alignItems: 'center',
})

const Divider = styled(MuiDivider)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1, 0),
}))

const Link = ({ text, href }: { text: string; href: string }) => (
  <NextLink href={href} passHref>
    <MuiLink
      sx={{ textDecoration: 'none', pointerEvents: href ? 'auto' : 'none' }}
    >
      {text}
    </MuiLink>
  </NextLink>
)
