import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { OrganizationNoteAclDto } from '../types'
import { OrganizationNoteAclTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: OrganizationNoteAclDto[]
  handleDeleteItemClick: (data: { id: string }) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'note', label: t('NOTE') },
    { id: 'organization', label: t('ORGANIZATION') },
    {
      id: 'permissionLevel',
      label: t('PERMISSION_LEVEL'),
      isSortingDisabled: true,
    },
    { id: 'createdAT', label: t('CREATED_AT') },
  ]
}

export const OrganizationNoteAclTable = ({
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
        <OrganizationNoteAclTableRow
          key={acl.id}
          data={acl}
          onEditClick={() =>
            router.push(`/organization-note-acl/edit/${acl.id}`)
          }
          onDeleteClick={() => handleDeleteItemClick({ id: acl.id })}
        />
      ))}
    </Table>
  )
}
