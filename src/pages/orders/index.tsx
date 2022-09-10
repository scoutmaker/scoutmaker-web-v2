import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useMatchesList } from '@/modules/matches/hooks'
import { OrdersFilterForm } from '@/modules/orders/forms/filter'
import {
  useAcceptOrder,
  useCloseOrder,
  useDeleteOrder,
  useOrders,
  useRejectOrder,
} from '@/modules/orders/hooks'
import { OrdersTableRow } from '@/modules/orders/table/row'
import { OrdersTable } from '@/modules/orders/table/table'
import { OrdersFiltersDto, OrdersSortBy } from '@/modules/orders/types'
import { usePlayersList } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { formatDate } from '@/utils/format-date'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

interface IData {
  userId: number
}

export const getServerSideProps = withSessionSsrRole<IData>(
  ['common', 'orders'],
  ['ADMIN', 'PLAYMAKER_SCOUT'],
  async (token, params, user) => ({ data: { userId: user?.id as number } }),
)

const date = new Date()
date.setFullYear(date.getFullYear() + 1)

const initialFilters: OrdersFiltersDto = {
  createdAfter: formatDate('01-01-1999'),
  createdBefore: formatDate(date.toString()),
  matchIds: [],
  playerIds: [],
  status: 'OPEN',
  teamIds: [],
  // @ts-ignore
  userId: false,
  onlyMine: false,
}

interface ItoDeleteData {
  id: number
}

const OrdersPage = ({ errorStatus, errorMessage, data }: TSsrRole<IData>) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<ItoDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order: tableOrder },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('orders-table')

  const [filters, setFilters] = useLocalStorage<OrdersFiltersDto>({
    key: 'orders-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: OrdersFiltersDto) {
    const filtersRS = newFilters // for eslint

    if (filtersRS.onlyMine) filtersRS.userId = data?.userId
    else filtersRS.userId = undefined

    setFilters(filtersRS)
    handleChangePage(null, 0)
  }

  const { data: matchesData, isLoading: matchesLoading } = useMatchesList()

  const { data: playersData, isLoading: playersLoading } = usePlayersList()

  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()

  const { data: orders, isLoading: ordersLoading } = useOrders({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as OrdersSortBy,
    sortingOrder: tableOrder,
    ...filters,
  })

  const { mutate: deleteOrder, isLoading: deleteLoading } = useDeleteOrder()

  const { mutate: acceptOrder, isLoading: acceptLoading } = useAcceptOrder()
  const { mutate: rejectOrder, isLoading: rejectLoading } = useRejectOrder()
  const { mutate: closeOrder, isLoading: closeLoading } = useCloseOrder()

  const isLoading =
    deleteLoading ||
    ordersLoading ||
    matchesLoading ||
    playersLoading ||
    teamsLoading ||
    acceptLoading ||
    rejectLoading ||
    closeLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('orders:INDEX_PAGE_TITLE')} />
      <OrdersFilterForm
        matchesData={matchesData || []}
        playersData={playersData || []}
        teamsData={teamsData || []}
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
      <OrdersTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={tableOrder}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={orders?.totalDocs || 0}
        actions
      >
        {!!orders &&
          orders.docs.map(order => (
            <OrdersTableRow
              onAcceptOrderClick={acceptOrder}
              onCloseOrderClick={closeOrder}
              onRejectOrderClick={rejectOrder}
              key={order.id}
              data={order}
              onDeleteClick={() => {
                setToDeleteData({ id: order.id })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isDeleteOptionEnabled
            />
          ))}
      </OrdersTable>
      <Fab href="/orders/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('orders:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteOrder(toDeleteData.id)

          setToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default OrdersPage
