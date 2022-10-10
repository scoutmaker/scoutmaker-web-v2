import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { UserFootballRoleDto } from '../types'
import { UserFootballRolesTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: UserFootballRoleDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [{ id: 'name', label: t('NAME') }]
}

export const UserFootballRolesTable = ({
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
      {data.map(role => (
        <UserFootballRolesTableRow
          key={role.id}
          data={role}
          onEditClick={() =>
            router.push(`/user-football-roles/edit/${role.id}`)
          }
          onDeleteClick={() =>
            handleDeleteItemClick({ id: role.id, name: role.name })
          }
        />
      ))}
    </Table>
  )
}
