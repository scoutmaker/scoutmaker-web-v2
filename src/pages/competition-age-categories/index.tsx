import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionAgeCategoriesFilterForm } from '@/modules/competition-age-categories/forms/filter'
import {
  useCompetitionAgeCategories,
  useDeleteCompetitionAgeCategory,
} from '@/modules/competition-age-categories/hooks'
import { CompetitionAgeCategoriesTableRow } from '@/modules/competition-age-categories/table/row'
import { CompetitionAgeCategoriesTable } from '@/modules/competition-age-categories/table/table'
import {
  CompetitionAgeCategoriesFiltersDto,
  CompetitionAgeCategoriesSortBy,
} from '@/modules/competition-age-categories/types'
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

interface IToDeleteData {
  id: string
  name: string
}

const CompetitionAgeCategoriesPage = ({
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

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {(dataLoading || deleteLoading) && <Loader />}
      <PageHeading title={t('comp-age-categ:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <CompetitionAgeCategoriesFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
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
      >
        {!!compAgeCateg &&
          compAgeCateg.docs.map(item => (
            <CompetitionAgeCategoriesTableRow
              key={item.id}
              data={item}
              onEditClick={() => {
                router.push(`/competition-age-categories/edit/${item.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: item.id, name: item.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </CompetitionAgeCategoriesTable>
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
