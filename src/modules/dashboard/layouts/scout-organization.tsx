import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import {
  MatchesIcon,
  NotesIcon,
  PlayersIcon,
  ReportsIcon,
  UsersIcon,
} from '@/components/icons'
import { getBasicMatchName } from '@/modules/matches/utils'
import { getPlayerFullName } from '@/modules/players/utils'
import { getDocumentNumber } from '@/utils/get-document-number'

import { BasicCard } from '../BasicCard'
import { CountCard } from '../CountCard'
import ListDataCard from '../ListDataCard'
import { DashboardDto } from '../types'

interface IProps {
  data: DashboardDto
}

const ScoutOrganizationDashboardLayout = ({ data }: IProps) => {
  const { t } = useTranslation()
  const { scouts, observerdPlayers, observedMatches, topNotes, topReports } =
    data

  return (
    <>
      <CountCard icon={<UsersIcon />} title="Liczba skautów" count={scouts} />
      <CountCard
        icon={<PlayersIcon />}
        title="Liczba piłkarzy"
        count={observerdPlayers}
        linkTo="/players"
      />
      <CountCard
        icon={<MatchesIcon />}
        title="Liczba obejrzanych meczy"
        count={observedMatches}
        linkTo="/matches"
      />
      <ListDataCard
        icon={<NotesIcon />}
        title="Top notatki"
        subheader="Top 5 ostatnich notatek"
        items={
          topNotes?.map(
            ({ rating, player, createdAt, docNumber, match, id }) => (
              <CardItemBasic
                key={id}
                title={player ? getPlayerFullName(player) : '-'}
                value={`${rating} - ${
                  match ? getBasicMatchName(match) : ''
                } (${getDocumentNumber({
                  docNumber,
                  createdAt,
                })})`}
                href={`/notes/${id}`}
              />
            ),
          ) || 'ERROR: NO DATA'
        }
      />
      <ListDataCard
        icon={<ReportsIcon />}
        title="Top raporty"
        subheader="Top 5 ostatnich raportów"
        items={
          topReports?.map(
            ({ finalRating, player, createdAt, docNumber, match, id }) => (
              <CardItemBasic
                key={id}
                title={player ? getPlayerFullName(player) : '-'}
                value={`${finalRating} - ${
                  match ? getBasicMatchName(match) : ''
                } (${getDocumentNumber({
                  docNumber,
                  createdAt,
                })})`}
                href={`/reports/${id}`}
              />
            ),
          ) || 'ERROR: NO DATA'
        }
      />
      <ListDataCard
        icon={<PlayersIcon />}
        title="Top piłkarze"
        subheader="Top 5 piłkarzy"
        items="TO ADD"
      />
      <BasicCard title={t('NOTES')} linkTo="/notes" icon={<NotesIcon />} />
      <BasicCard
        title={t('PLAYERS')}
        linkTo="/players"
        icon={<PlayersIcon />}
      />
      <BasicCard
        title={t('REPORTS')}
        linkTo="/reports"
        icon={<ReportsIcon />}
      />
    </>
  )
}

export default ScoutOrganizationDashboardLayout
