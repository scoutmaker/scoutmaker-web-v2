import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionGroupsFilterForm } from '@/modules/competition-groups/forms/filter'
import {
  useCompetitionGroups,
  useDeleteCompetitionGroup,
} from '@/modules/competition-groups/hooks'
import { CompetitionGroupsTable } from '@/modules/competition-groups/table/table'
import {
  CompetitionGroupsFiltersDto,
  CompetitionGroupsSortBy,
} from '@/modules/competition-groups/types'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { SeasonsFiltersDto } from '@/modules/seasons/types'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: CompetitionGroupsFiltersDto = {
  name: '',
  competitionIds: [],
  regionIds: [],
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'comp-groups'],
  ['ADMIN'],
)

const CompetitionGroupsPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('compGroupsTable')

  const [filters, setFilters] = useLocalStorage<SeasonsFiltersDto>({
    key: 'comp-groups-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: SeasonsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: compGroups, isLoading: dataLoading } = useCompetitionGroups({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as CompetitionGroupsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { data: competitionsData, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: regionsData, isLoading: regionsLoading } = useRegionsList()

  const { mutate: deleteCompGroup, isLoading: deleteLoading } =
    useDeleteCompetitionGroup()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading || deleteLoading || competitionsLoading || regionsLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('comp-groups:INDEX_PAGE_TITLE')} />
      <CompetitionGroupsFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
        competitionsData={competitionsData || []}
        regionsData={regionsData || []}
      />
      <CompetitionGroupsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={compGroups?.totalDocs || 0}
        actions
        data={compGroups?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/competition-groups/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('comp-groups:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deleteCompGroup(toDeleteData.id)

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

export default CompetitionGroupsPage
