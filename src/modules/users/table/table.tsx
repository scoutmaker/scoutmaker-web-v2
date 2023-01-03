import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { UserDto } from '../types'
import { UsersTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: UserDto[]
  onSetRole: (arg: { id: string; role: UserDto['role'] }) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'lastName', label: t('LAST_NAME') },
    { id: 'firstName', label: t('FIRST_NAME') },
    { id: 'email', label: t('EMAIL'), isSortingDisabled: true },
    { id: 'role', label: t('ROLE'), isSortingDisabled: true },
    { id: 'region', label: t('REGION') },
    { id: 'city', label: t('CITY'), isSortingDisabled: true },
  ]
}

export const UsersTable = ({
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
  onSetRole,
}: ITableProps) => {
  const { t } = useTranslation()

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
      {data.map(user => (
        <UsersTableRow key={user.id} data={user} onSetRole={onSetRole} />
      ))}
    </Table>
  )
}
