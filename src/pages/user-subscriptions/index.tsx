import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { UserSubscriptionsFilterForm } from '@/modules/user-subscriptions/forms/filter'
import { useDeleteUserSubscription, useUserSubscriptions } from '@/modules/user-subscriptions/hooks'
import { UserSubscriptionsTableRow } from '@/modules/user-subscriptions/table/row'
import { UserSubscriptionsTable } from '@/modules/user-subscriptions/table/table'
import { UserSubscriptionsFiltersDto, UserSubscriptionsSortBy } from '@/modules/user-subscriptions/types'
import { useUsersList } from '@/modules/users/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: UserSubscriptionsFiltersDto = {
  competitionGroupIds: [],
  competitionIds: [],
  userId: ''
}

export const getServerSideProps = withSessionSsrRole(['common', 'user-subs'], ['ADMIN'])

interface IToDeleteData {
  id: string
}

const UserSubscriptionsPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] =
    useState<IToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('userSubsTable')

  const [filters, setFilters] = useLocalStorage<UserSubscriptionsFiltersDto>({
    key: 'user-subs-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: UserSubscriptionsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: userSubscriptions, isLoading: dataLoading } = useUserSubscriptions({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as UserSubscriptionsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteUserSub, isLoading: deleteLoading } = useDeleteUserSubscription()

  const { data: compGroupsData, isLoading: compGroupsLoading } = useCompetitionGroupsList()
  const { data: compsData, isLoading: compsLoading } = useCompetitionsList()
  const { data: usersData, isLoading: usersLoading } = useUsersList()


  const isLoading = dataLoading || deleteLoading || compGroupsLoading || compsLoading || usersLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('user-subs:INDEX_PAGE_TITLE')} />
      <UserSubscriptionsFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
        competitionGroupsData={compGroupsData || []}
        competitionsData={compsData || []}
        usersData={usersData || []}
      />
      <UserSubscriptionsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={userSubscriptions?.totalDocs || 0}
        actions
      >
        {!!userSubscriptions &&
          userSubscriptions.docs.map(season => (
            <UserSubscriptionsTableRow
              key={season.id}
              data={season}
              onEditClick={() => {
                router.push(`/user-subscriptions/edit/${season.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: season.id })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))
        }
      </UserSubscriptionsTable>
      <Fab href="/user-subscriptions/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('user-subs:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData)
            deleteUserSub(toDeleteData.id)

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

export default UserSubscriptionsPage