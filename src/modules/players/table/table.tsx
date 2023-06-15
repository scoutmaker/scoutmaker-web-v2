import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { PlayerDto, PlayersSortBy } from '../types'
import { PlayersTableRow } from './row'

interface IPlayersTableProps extends ICommonTableProps {
  data: PlayerDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
  onLikeClick: (id: string) => void
  onUnLikeClick: (id: string) => void
  showRole?: boolean
}

function generateHeadCells(t: TFunction): IHeadCell<PlayersSortBy>[] {
  return [
    { id: undefined, label: '', isSortingDisabled: true },
    { id: 'country', label: t('COUNTRY') },
    { id: 'lastName', label: t('LAST_NAME') },
    { id: 'firstName', label: t('FIRST_NAME') },
    { id: undefined, label: t('TEAM'), isSortingDisabled: true },
    { id: 'yearOfBirth', label: t('YEAR_OF_BIRTH') },
    { id: 'primaryPosition', label: t('PRIMARY_POSITION') },
    { id: 'footed', label: t('FOOTED'), isSortingDisabled: true },
    { id: 'grade', label: t('players:POTENTIAL') },
    { id: 'reportsCount', label: t('REPORTS') },
    { id: 'notesCount', label: t('NOTES') },
    {
      id: 'averagePercentageRating',
      label: t('AVG_RATING'),
    },
  ]
}

export const PlayersTable = ({
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
  onLikeClick,
  onUnLikeClick,
  showRole,
}: IPlayersTableProps) => {
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
      {data.map(player => (
        <PlayersTableRow
          key={player.id}
          data={player}
          onEditClick={() => router.push(`/players/edit/${player.slug}`)}
          onDeleteClick={() =>
            handleDeleteItemClick({
              id: player.id,
              name: `${player.firstName} ${player.lastName}`,
            })
          }
          onLikeClick={onLikeClick}
          onUnlikeClick={onUnLikeClick}
          showRole={showRole}
        />
      ))}
    </Table>
  )
}
