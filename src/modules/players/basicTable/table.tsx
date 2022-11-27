import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { PlayerSuperBasicDataDto } from '../types'
import { PlayersBasicTableRow } from './row'

interface IPlayersBasicTableProps extends ICommonTableProps {
  data: PlayerSuperBasicDataDto[]
  handleDeleteItemClick?: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'lastName', label: t('LAST_NAME'), isSortingDisabled: true },
    { id: 'firstName', label: t('FIRST_NAME'), isSortingDisabled: true },
  ]
}

export const PlayersBasicTable = ({
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
}: IPlayersBasicTableProps) => {
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
        <PlayersBasicTableRow
          key={player.id}
          data={player}
          onEditClick={() => router.push(`/players/edit/${player.slug}`)}
          onDeleteClick={
            handleDeleteItemClick
              ? () =>
                  handleDeleteItemClick({
                    id: player.id,
                    name: `${player.firstName} ${player.lastName}`,
                  })
              : undefined
          }
          actions={actions}
        />
      ))}
    </Table>
  )
}
