import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { OrganizationDto } from '../types'
import { OrganizationsTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: OrganizationDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'createdAd', label: t('CREATED_AT') },
    {
      id: 'memberCount',
      label: t('organizations:MEMBER_COUNT'),
      isSortingDisabled: true,
    },
  ]
}

export const OrganizationsTable = ({
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
      {data.map(org => (
        <OrganizationsTableRow
          key={org.id}
          data={org}
          onEditClick={() => router.push(`/organizations/edit/${org.id}`)}
          onDeleteClick={() =>
            handleDeleteItemClick({ id: org.id, name: org.name })
          }
        />
      ))}
    </Table>
  )
}
