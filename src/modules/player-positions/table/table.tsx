import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { PlayerPositionDto } from '../types'
import { PlayerPositionsTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: PlayerPositionDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'code', label: t('CODE') },
  ]
}

export const PlayerPositionsTable = ({
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
      {data.map(position => (
        <PlayerPositionsTableRow
          key={position.id}
          data={position}
          onEditClick={() =>
            router.push(`/player-positions/edit/${position.id}`)
          }
          onDeleteClick={() =>
            handleDeleteItemClick({ id: position.id, name: position.name })
          }
        />
      ))}
    </Table>
  )
}
