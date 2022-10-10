import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionAgeCategoriesFilterForm } from '@/modules/competition-age-categories/forms/filter'
import {
  useCompetitionAgeCategories,
  useDeleteCompetitionAgeCategory,
} from '@/modules/competition-age-categories/hooks'
import { CompetitionAgeCategoriesTable } from '@/modules/competition-age-categories/table/table'
import {
  CompetitionAgeCategoriesFiltersDto,
  CompetitionAgeCategoriesSortBy,
} from '@/modules/competition-age-categories/types'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: CompetitionAgeCategoriesFiltersDto = {
  name: '',
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'comp-age-categ'],
  ['ADMIN'],
)

const CompetitionAgeCategoriesPage = ({
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
  } = useTable('compAgeCategTable')

  const [filters, setFilters] =
    useLocalStorage<CompetitionAgeCategoriesFiltersDto>({
      key: 'compAgeCateg-filters',
      initialValue: initialFilters,
    })

  const handleSetFilters = (newFilters: CompetitionAgeCategoriesFiltersDto) => {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: compAgeCateg, isLoading: dataLoading } =
    useCompetitionAgeCategories({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as CompetitionAgeCategoriesSortBy,
      sortingOrder: order,
      ...filters,
    })

  const { mutate: deleteCompAgeCateg, isLoading: deleteLoading } =
    useDeleteCompetitionAgeCategory()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {(dataLoading || deleteLoading) && <Loader />}
      <PageHeading title={t('comp-age-categ:INDEX_PAGE_TITLE')} />
      <CompetitionAgeCategoriesFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
      <CompetitionAgeCategoriesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={compAgeCateg?.totalDocs || 0}
        actions
        data={compAgeCateg?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/competition-age-categories/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('comp-age-categ:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deleteCompAgeCateg(toDeleteData.id)

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

export default CompetitionAgeCategoriesPage
