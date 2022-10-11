import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { PlayerDto } from '../types'
import { PlayersTableRow } from './row'

interface IPlayersTableProps extends ICommonTableProps {
  data: PlayerDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
  onLikeClick: (id: string) => void
  onUnLikeClick: (id: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'favourite', label: '', isSortingDisabled: true },
    { id: 'lastName', label: t('LAST_NAME') },
    { id: 'firstName', label: t('FIRST_NAME') },
    { id: 'country', label: t('COUNTRY') },
    { id: 'team', label: t('TEAM') },
    { id: 'primaryPosition', label: t('PRIMARY_POSITION') },
    { id: 'yearOfBirth', label: t('YEAR_OF_BIRTH') },
    { id: 'height', label: t('HEIGHT') },
    { id: 'weight', label: t('WEIGHT') },
    { id: 'footed', label: t('FOOTED') },
    { id: 'reportsCount', label: t('REPORTS_COUNT') },
    { id: 'notesCount', label: t('NOTES_COUNT') },
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
        />
      ))}
    </Table>
  )
}
