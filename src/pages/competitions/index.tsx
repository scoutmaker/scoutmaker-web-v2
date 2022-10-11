import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionAgeCategoriesList } from '@/modules/competition-age-categories/hooks'
import { useCompetitionJuniorLevelsList } from '@/modules/competition-junior-levels/hooks'
import { useCompetitionTypesList } from '@/modules/competition-types/hooks'
import { CompetitionsFilterForm } from '@/modules/competitions/forms/filter'
import {
  useCompetitions,
  useDeleteCompetition,
} from '@/modules/competitions/hooks'
import { CompetitionsTable } from '@/modules/competitions/table/table'
import {
  CompetitionsFiltersDto,
  CompetitionsSortBy,
} from '@/modules/competitions/types'
import { useCountriesList } from '@/modules/countries/hooks'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'competitions'],
  ['ADMIN'],
)

const initialFilters: CompetitionsFiltersDto = {
  name: '',
  ageCategoryId: '',
  countryId: '',
  gender: undefined,
  juniorLevelId: '',
  level: 0,
  typeId: '',
}

const CompetitionsPage = ({ errorStatus, errorMessage }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('competitions-table')

  const [filters, setFilters] = useLocalStorage<CompetitionsFiltersDto>({
    key: 'competitions-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: CompetitionsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: ageCategoriesData, isLoading: ageCategLoading } =
    useCompetitionAgeCategoriesList()

  const { data: juniorLevelsData, isLoading: juniorLevelsLoading } =
    useCompetitionJuniorLevelsList()

  const { data: competitionTypesData, isLoading: compTypesLoading } =
    useCompetitionTypesList()

  const { data: countriesData, isLoading: countriesLoading } =
    useCountriesList()

  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitions({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as CompetitionsSortBy,
      sortingOrder: order,
      ...filters,
    })

  const { mutate: deleteCompetition, isLoading: deleteCompetitionLoading } =
    useDeleteCompetition()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    juniorLevelsLoading ||
    ageCategLoading ||
    deleteCompetitionLoading ||
    compTypesLoading ||
    competitionsLoading ||
    countriesLoading ||
    competitionsLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('competitions:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <CompetitionsFilterForm
          filters={filters}
          competitionAgeCategoriesData={ageCategoriesData || []}
          competitionJuniorLevelsData={juniorLevelsData || []}
          competitionTypesData={competitionTypesData || []}
          countriesData={countriesData || []}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <CompetitionsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={competitions?.totalDocs || 0}
        actions
        data={competitions?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/competitions/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('competitions:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deleteCompetition(toDeleteData.id)

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

export default CompetitionsPage
