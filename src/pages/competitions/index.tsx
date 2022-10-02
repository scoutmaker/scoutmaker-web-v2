import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
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
import { CompetitionsTableRow } from '@/modules/competitions/table/row'
import { CompetitionsTable } from '@/modules/competitions/table/table'
import {
  CompetitionsFiltersDto,
  CompetitionsSortBy,
} from '@/modules/competitions/types'
import { useCountriesList } from '@/modules/countries/hooks'
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
  // @ts-ignore for empty field | with 0 form doesnt submit
  level: '',
  typeId: '',
}

interface IToDeleteData {
  id: string
  name: string
}

const CompetitionsPage = ({ errorStatus, errorMessage }: TSsrRole) => {
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
      <CompetitionsFilterForm
        filters={filters}
        competitionAgeCategoriesData={ageCategoriesData || []}
        competitionJuniorLevelsData={juniorLevelsData || []}
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
        {!!competitions &&
          competitions.docs.map(comp => (
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
