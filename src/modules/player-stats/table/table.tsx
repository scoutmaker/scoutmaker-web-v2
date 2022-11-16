import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { PlayerStatsDto } from '../types'
import { PlayerStatsTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: PlayerStatsDto[]
  handleDeleteItemClick: (data: { id: string }) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'player', label: t('PLAYER') },
    { id: 'match', label: t('MATCH') },
    { id: 'goals', label: t('GOALS') },
    { id: 'assists', label: t('ASSISTS') },
    { id: 'minutesPlayed', label: t('MINUTES_PLAYED') },
    { id: 'yellowCards', label: t('YELLOW_CARDS') },
    { id: 'redCards', label: t('RED_CARDS') },
  ]
}

export const PlayerStatsTable = ({
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
}: ITableProps) => {
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
      {data.map(stat => (
        <PlayerStatsTableRow
          key={stat.id}
          data={stat}
          onEditClick={() => router.push(`/player-stats/edit/${stat.id}`)}
          onDeleteClick={() => handleDeleteItemClick({ id: stat.id })}
        />
      ))}
    </Table>
  )
}
