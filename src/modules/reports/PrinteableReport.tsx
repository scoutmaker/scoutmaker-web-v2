import {
  Box,
  Divider as MuiDivider,
  styled,
  Theme,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Fragment, useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

import { RatingChip } from '@/components/rating-chip/rating-chip'
import { formatDate } from '@/utils/format-date'
import { getDocumentNumber } from '@/utils/get-document-number'

import { MatchDto } from '../matches/types'
import { PlayerDto } from '../players/types'
import { getAuthorDisplayName } from '../users/utils'
import { SkillsChart } from './components/skillsChart'
import { SkillsPrintSection } from './components/skillsPrintSection'
import { ReportDto } from './types'
import { sortAndGroupSkills } from './utils'

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
    skillsOrder,
    compactCategoriesIds,
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
    if (typeof homeGoals === 'number' && typeof awayGoals === 'number')
      txt += ` (${homeGoals} - ${awayGoals})`

    return txt
  }

  const groupedSkills = sortAndGroupSkills(
    skills,
    skillsOrder,
    compactCategoriesIds,
  )
  const compactSkills = groupArr(
    groupedSkills.filter(g => g.compact),
    3,
  )

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
      <Flex
        as="section"
        sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <div>
          <Flex>
            <Text gutterBottom>
              <strong>{t('PLAYER')}: </strong>
              {player.firstName} {player.lastName}, ur. {player.yearOfBirth}
            </Text>
            <Text gutterBottom sx={marginLeft}>
              <strong>{t('SHIRT_NO')}: </strong>
              {shirtNo || 'N/A'}
            </Text>
          </Flex>

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
              {getAuthorDisplayName(author)}
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
        </div>
        <Box
          marginTop={theme => theme.spacing(-5)}
          position="relative"
          width="450px"
        >
          {isAnySkillRated && (
            <SkillsChart
              skills={skills.filter(skill => typeof skill.rating === 'number')}
              maxRatingScore={report.maxRatingScore}
            />
          )}
        </Box>
      </Flex>
      <Divider />
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
      <Divider />
      {groupedSkills
        .filter(g => !g.compact)
        .map(group => (
          <Fragment key={group.id}>
            <SkillsPrintSection
              category={group.name}
              maxRatingScore={maxRatingScore}
              skills={group.skills || []}
              compact={group.compact}
            />
            <Divider />
          </Fragment>
        ))}

      {compactSkills.map(section => (
        <Fragment key={section.map(sec => sec.id).join('')}>
          <Box display="flex">
            {section.map(group => (
              <SkillsPrintSection
                key={group.id}
                category={group.name}
                maxRatingScore={maxRatingScore}
                skills={group.skills || []}
                compact={group.compact}
              />
            ))}
          </Box>
          <Divider />
        </Fragment>
      ))}
    </Container>
  )
}

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 4),
  zIndex: 1,
  position: 'relative',
  // width: '100%',
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

const Flex = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})

const Divider = styled(MuiDivider)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1, 0),
}))

function groupArr<T>(data: T[], n: number): Array<T[]> {
  const group: Array<T[]> = []
  for (let i = 0, j = 0; i < data.length; i += 1) {
    if (i >= n && i % n === 0) j += 1
    group[j] = group[j] || []
    group[j].push(data[i])
  }
  return group
}
