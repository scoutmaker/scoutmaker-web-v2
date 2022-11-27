import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { UserSubscriptionDto } from '../types'
import { UserSubscriptionsTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: UserSubscriptionDto[]
  handleDeleteItemClick: (data: { id: string }) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'user', label: t('USER') },
    { id: 'startDate', label: t('user-subs:START_DATE') },
    { id: 'endDate', label: t('user-subs:END_DATE') },
  ]
}

export const UserSubscriptionsTable = ({
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
      {data.map(season => (
        <UserSubscriptionsTableRow
          key={season.id}
          data={season}
          onEditClick={() =>
            router.push(`/user-subscriptions/edit/${season.id}`)
          }
          onDeleteClick={() => handleDeleteItemClick({ id: season.id })}
        />
      ))}
    </Table>
  )
}
