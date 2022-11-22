import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useReportsList } from '@/modules/reports/hooks'
import { UserReportAclFilterForm } from '@/modules/user-report-acl/forms/filter'
import {
  useDeleteUserReportAcl,
  useUserReportAcls,
} from '@/modules/user-report-acl/hooks'
import { UserReportAclTable } from '@/modules/user-report-acl/table/table'
import {
  UserReportAclFiltersState,
  UserReportAclSortBy,
} from '@/modules/user-report-acl/types'
import { useUsersList } from '@/modules/users/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: UserReportAclFiltersState = {
  reportId: null,
  userId: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'user-report-acl', 'permissions'],
  ['ADMIN'],
)

const UserReportAclsPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<{ id: string }>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('userReportAclTable')

  const [filters, setFilters] = useLocalStorage<UserReportAclFiltersState>({
    key: 'user-report-acl-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: UserReportAclFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: userReportAcls, isLoading: dataLoading } = useUserReportAcls({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as UserReportAclSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { data: usersData, isLoading: usersLoading } = useUsersList()
  const { data: reportsData, isLoading: reportsLoading } = useReportsList()

  const { mutate: deleteUserReportAcl, isLoading: deleteLoading } =
    useDeleteUserReportAcl()

  const handleDeleteItemClick = (data: { id: string }) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading || deleteLoading || usersLoading || reportsLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('user-report-acl:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <UserReportAclFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          reportsData={reportsData || []}
          usersData={usersData || []}
        />
      </FilterAccordion>
      <UserReportAclTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={userReportAcls?.totalDocs || 0}
        actions
        data={userReportAcls?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/user-report-acl/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('user-report-acl:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteUserReportAcl(toDeleteData.id)

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

export default UserReportAclsPage
