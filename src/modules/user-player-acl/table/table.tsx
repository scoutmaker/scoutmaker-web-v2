import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { UserPlayerAclDto } from '../types'
import { UserPlayerAclTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: UserPlayerAclDto[]
  handleDeleteItemClick: (data: { id: string }) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'user', label: t('USER') },
    { id: 'player', label: t('PLAYER') },
    {
      id: 'permissionLevel',
      label: t('PERMISSION_LEVEL'),
      isSortingDisabled: true,
    },
    { id: 'createdAt', label: t('CREATED_AT') },
  ]
}

export const UserPlayerAclTable = ({
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
        <UserPlayerAclTableRow
          key={acl.id}
          data={acl}
          onEditClick={() => router.push(`/user-player-acl/edit/${acl.id}`)}
          onDeleteClick={() => handleDeleteItemClick({ id: acl.id })}
        />
      ))}
    </Table>
  )
}
