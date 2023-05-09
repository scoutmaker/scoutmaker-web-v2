import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { MatchDto, MatchesSortBy } from '../types'
import { MatchesTableRow } from './row'

interface IMatchesTableProps extends ICommonTableProps {
  data: MatchDto[]
  handleDeleteItemClick?: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell<MatchesSortBy>[] {
  return [
    { id: 'date', label: t('DATE') },
    { id: 'homeTeam', label: t('HOME_TEAM') },
    { id: 'awayTeam', label: t('AWAY_TEAM') },
    { id: 'competition', label: t('COMPETITION') },
    { id: 'group', label: t('GROUP') },
    { id: undefined, label: t('RESULT'), isSortingDisabled: true },
    { id: 'reportsCount', label: t('REPORTS') },
    { id: 'notesCount', label: t('NOTES') },
    {
      id: undefined,
      label: t('OBSERVATION'),
      isSortingDisabled: true,
    },
    { id: 'season', label: t('SEASON') },
  ]
}

export const MatchesTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  total,
  actions,
  data,
  handleDeleteItemClick,
}: IMatchesTableProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Table
      page={page}
      rowsPerPage={rowsPerPage}
      sortBy={sortBy}
      order={order}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleSort={handleSort}
      total={total}
      headCells={generateHeadCells(t)}
      actions={actions}
    >
      {data.map(match => (
        <MatchesTableRow
          key={match.id}
          data={match}
          onEditClick={() => router.push(`/matches/edit/${match.id}`)}
          onDeleteClick={
            handleDeleteItemClick
              ? () =>
                  handleDeleteItemClick({
                    id: match.id,
                    name: `${match.homeTeam.name} vs. ${match.awayTeam.name}`,
                  })
              : undefined
          }
          actions={actions}
        />
      ))}
    </Table>
  )
}
