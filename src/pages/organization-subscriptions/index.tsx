import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

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
import { OrganizationSubscriptionsTableRow } from '@/modules/organization-subscriptions/table/row'
import { OrganizationSubscriptionsTable } from '@/modules/organization-subscriptions/table/table'
import {
  OrganizationSubscriptionsFiltersDto,
  OrganizationSubscriptionsSortBy,
} from '@/modules/organization-subscriptions/types'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: OrganizationSubscriptionsFiltersDto = {
  competitionGroupIds: [],
  competitionIds: [],
  organizationId: '',
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-subs'],
  ['ADMIN'],
)

interface IToDeleteData {
  id: string
  name: string
}

const OrganizationSubscriptionsPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<IToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('orgSubsTable')

  const [filters, setFilters] =
    useLocalStorage<OrganizationSubscriptionsFiltersDto>({
      key: 'organization-subs-filters',
      initialValue: initialFilters,
    })

  function handleSetFilters(newFilters: OrganizationSubscriptionsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: orgSubs, isLoading: dataLoading } =
    useOrganizationSubscriptions({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as OrganizationSubscriptionsSortBy,
      sortingOrder: order,
      ...filters,
    })

  const { mutate: deleteOrgSub, isLoading: deleteLoading } =
    useDeleteOrganizationSubscription()

  const { data: organizations, isLoading: organizationsLoading } =
    useOrganizationsList()
  const { data: compGroups, isLoading: compgroupsLoading } =
    useCompetitionGroupsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()

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
      >
        {!!orgSubs &&
          orgSubs.docs.map(sub => (
            <OrganizationSubscriptionsTableRow
              key={sub.id}
              data={sub}
              onEditClick={() => {
                router.push(`/organization-subscriptions/edit/${sub.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: sub.id, name: sub.organization.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </OrganizationSubscriptionsTable>
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
