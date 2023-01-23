import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { PlayerRoleDto } from '../types'
import { PlayerRolesTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: PlayerRoleDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
  showTableMenu: boolean
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    {
      id: 'positionTypeId',
      label: t('POSITION_TYPE'),
    },
    { id: 'name', label: t('NAME') },
    { id: 'description', label: t('DESCRIPTION'), isSortingDisabled: true },
    { id: 'examples', label: t('EXAMPLES'), isSortingDisabled: true },
  ]
}

export const PlayerRolesTable = ({
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
  showTableMenu,
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
        <PlayerRolesTableRow
          key={position.id}
          data={position}
          onEditClick={() => router.push(`/player-roles/edit/${position.id}`)}
          onDeleteClick={() =>
            handleDeleteItemClick({ id: position.id, name: position.name })
          }
          showTableMenu={showTableMenu}
        />
      ))}
    </Table>
  )
}
