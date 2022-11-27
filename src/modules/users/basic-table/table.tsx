import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { UserBasicDataDto } from '../types'
import { BasicUsersTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: UserBasicDataDto[]
  onRemoveFromOrganization: (memberId: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'lastName', label: t('LAST_NAME'), isSortingDisabled: true },
    { id: 'firstName', label: t('FIRST_NAME'), isSortingDisabled: true },
  ]
}

export const BasicUsersTable = ({
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
  onRemoveFromOrganization,
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
      {data.map(member => (
        <BasicUsersTableRow
          data={member}
          onRemoveFromOrganization={() => onRemoveFromOrganization(member.id)}
        />
      ))}
    </Table>
  )
}
