import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { OrganizationSubscriptionDto } from '../types'
import { OrganizationSubscriptionsTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: OrganizationSubscriptionDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'organization', label: t('ORGANIZATION') },
    { id: 'startDate', label: t('organization-subs:START_DATE') },
    { id: 'endDate', label: t('organization-subs:END_DATE') },
  ]
}

export const OrganizationSubscriptionsTable = ({
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
      {data.map(sub => (
        <OrganizationSubscriptionsTableRow
          key={sub.id}
          data={sub}
          onEditClick={() =>
            router.push(`/organization-subscriptions/edit/${sub.id}`)
          }
          onDeleteClick={() =>
            handleDeleteItemClick({ id: sub.id, name: sub.organization.name })
          }
        />
      ))}
    </Table>
  )
}
