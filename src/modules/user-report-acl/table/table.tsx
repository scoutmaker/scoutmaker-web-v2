import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { UserReportAclDto } from '../types'
import { UserReportAclTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: UserReportAclDto[]
  handleDeleteItemClick: (data: { id: string }) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'report', label: t('REPORT') },
    { id: 'user', label: t('USER') },
    {
      id: 'permissionLevel',
      label: t('PERMISSION_LEVEL'),
      isSortingDisabled: true,
    },
    { id: 'createdAt', label: t('CREATED_AT') },
  ]
}

export const UserReportAclTable = ({
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
      {data.map(acl => (
        <UserReportAclTableRow
          key={acl.id}
          data={acl}
          onEditClick={() => router.push(`/user-report-acl/edit/${acl.id}`)}
          onDeleteClick={() => handleDeleteItemClick({ id: acl.id })}
        />
      ))}
    </Table>
  )
}
