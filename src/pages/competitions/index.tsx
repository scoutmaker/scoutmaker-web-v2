import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionAgeCategories } from '@/modules/competition-age-categories/hooks'
import { useCompetitionJuniorLevels } from '@/modules/competition-junior-levels/hooks'
import { useCompetitionTypes } from '@/modules/competition-types/hooks'
import { CompetitionsFilterForm } from '@/modules/competitions/forms/filter'
import { useCompetitions, useDeleteCompetition } from '@/modules/competitions/hooks'
import { CompetitionsTableRow } from '@/modules/competitions/table/row'
import { CompetitionsTable } from '@/modules/competitions/table/table'
import { CompetitionsFiltersDto, CompetitionsSortBy } from '@/modules/competitions/types'
import { useCountriesList } from '@/modules/countries/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

// ADD EDIT DELETE ROLE VALIDATION
export const getServerSideProps = withSessionSsrRole(['common', 'competitions'], false)

const initialFilters: CompetitionsFiltersDto = {
  name: '',
  ageCategoryId: 0,
  countryId: 0,
  gender: 'MALE',
  juniorLevelId: 0,
  level: 0,
  typeId: 0
}

interface IToDeleteData {
  id: number
  name: string
}

const CompetitionsPage = () => {
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
  } = useTable('competitions-table')

  const [filters, setFilters] = useLocalStorage<CompetitionsFiltersDto>({
    key: 'competitions-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: CompetitionsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  // UPDATE IN FUTURE
  const { data: ageCategoriesData, isLoading: ageCategLoading } = useCompetitionAgeCategories({})

  // UPDATE IN FUTURE
  const { data: juniorLevelsData, isLoading: juniorLevelsLoading } = useCompetitionJuniorLevels({})

  // UPDATE IN FUTURE
  const { data: competitionTypesData, isLoading: compTypesLoading } = useCompetitionTypes({})

  const { data: countriesData, isLoading: countriesLoading } = useCountriesList()

  const { data: competitions, isLoading: competitionsLoading } = useCompetitions({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as CompetitionsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteCompetition, isLoading: deleteCompetitionLoading } = useDeleteCompetition()

  const isLoading =
    juniorLevelsLoading ||
    ageCategLoading ||
    deleteCompetitionLoading ||
    compTypesLoading ||
    competitionsLoading ||
    countriesLoading ||
    competitionsLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('competitions:INDEX_PAGE_TITLE')} // ADD_TRANS
      />
      <CompetitionsFilterForm
        filters={filters}
        // @ts-ignore UPDATE IN FUTURE
        competitionAgeCategoriesData={ageCategoriesData || []}
        // @ts-ignore UPDATE IN FUTURE
        competitionJuniorLevelsData={juniorLevelsData || []}
        // @ts-ignore UPDATE IN FUTURE
        competitionTypesData={competitionTypesData || []}
        countriesData={countriesData || []}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
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
      >
        {!!competitions
          && competitions.docs.map(comp => (
            <CompetitionsTableRow
              key={comp.id}
              data={comp}
              onEditClick={() => {
                router.push(`/competitions/edit/${comp.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: comp.id, name: comp.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </CompetitionsTable>
      <Fab href="/competitions/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('competitions:DELETE_CONFIRM_QUESTION', { // ADD_TRANS
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
