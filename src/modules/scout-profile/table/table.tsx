import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { UserDto } from '@/modules/users/types'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { ScoutProfilesRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: UserDto[]
  handleDeleteItemClick: (id: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'lastName', label: t('LAST_NAME') },
    { id: 'firstName', label: t('FIRST_NAME') },
    { id: 'email', label: t('EMAIL'), isSortingDisabled: true },
    { id: 'role', label: t('ROLE'), isSortingDisabled: true },
    { id: 'region', label: t('REGION') },
    { id: 'city', label: t('CITY'), isSortingDisabled: true },
    {
      id: 'dateJoined',
      label: t('scout-profiles:DATE_JOINED'),
      isSortingDisabled: true,
    },
    { id: 'rating', label: t('RATING'), isSortingDisabled: true },
    {
      id: 'characteristic',
      label: t('CHARACTERISTICS'),
      isSortingDisabled: true,
    },
    { id: 'notesCount', label: t('NOTES'), isSortingDisabled: true },
    { id: 'reportsCount', label: t('REPORTS'), isSortingDisabled: true },
  ]
}

export const ScoutProfilesTable = ({
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
      {data.map(user => (
        <ScoutProfilesRow
          key={user.id}
          data={user}
          onEditClick={() =>
            router.push(`/scout-profiles/edit/${user.profile?.id}`)
          }
          onDeleteClick={() => handleDeleteItemClick(user.profile?.id || '')}
        />
      ))}
    </Table>
  )
}
