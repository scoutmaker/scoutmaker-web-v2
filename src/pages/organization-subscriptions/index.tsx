import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { OrganizationSubscriptionsFilterForm } from '@/modules/organization-subscriptions/forms/filter'
import {
  useDeleteOrganizationSubscription,
  useOrganizationSubscriptions,
} from '@/modules/organization-subscriptions/hooks'
import { OrganizationSubscriptionsTable } from '@/modules/organization-subscriptions/table/table'
import {
  OrganizationSubscriptionsFiltersState,
  OrganizationSubscriptionsSortBy,
} from '@/modules/organization-subscriptions/types'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: OrganizationSubscriptionsFiltersState = {
  competitionGroupIds: [],
  competitionIds: [],
  organizationId: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-subs'],
  ['ADMIN'],
)

const OrganizationSubscriptionsPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('orgSubsTable')

  const [filters, setFilters] =
    useLocalStorage<OrganizationSubscriptionsFiltersState>({
      key: 'organization-subs-filters',
      initialValue: initialFilters,
    })

  function handleSetFilters(newFilters: OrganizationSubscriptionsFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: orgSubs, isLoading: dataLoading } =
    useOrganizationSubscriptions({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as OrganizationSubscriptionsSortBy,
      sortingOrder: order,
      ...mapFiltersStateToDto(filters),
    })

  const { mutate: deleteOrgSub, isLoading: deleteLoading } =
    useDeleteOrganizationSubscription()

  const { data: organizations, isLoading: organizationsLoading } =
    useOrganizationsList()
  const { data: compGroups, isLoading: compgroupsLoading } =
    useCompetitionGroupsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading ||
    deleteLoading ||
    organizationsLoading ||
    compgroupsLoading ||
    competitionsLoading
  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organization-subs:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <OrganizationSubscriptionsFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          competitionGroupsData={compGroups || []}
          competitionsData={competitions || []}
          organizationsData={organizations || []}
        />
      </FilterAccordion>
      <OrganizationSubscriptionsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={orgSubs?.totalDocs || 0}
        actions
        data={orgSubs?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/organization-subscriptions/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('organization-subs:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deleteOrgSub(toDeleteData.id)

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

export default OrganizationSubscriptionsPage
