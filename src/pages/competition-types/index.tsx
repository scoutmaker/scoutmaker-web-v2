import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionTypesFilterForm } from '@/modules/competition-types/forms/filter'
import {
  useCompetitionTypes,
  useDeleteCompetitionType,
} from '@/modules/competition-types/hooks'
import { CompetitionTypesTableRow } from '@/modules/competition-types/table/row'
import { CompetitionTypesTable } from '@/modules/competition-types/table/table'
import {
  CompetitionTypesFiltersDto,
  CompetitionTypesSortBy,
} from '@/modules/competition-types/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: CompetitionTypesFiltersDto = {
  name: '',
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'competition-types'],
  ['ADMIN'],
)

interface IToDeleteData {
  id: string
  name: string
}

const CompetitionTypesPage = ({ errorMessage, errorStatus }: TSsrRole) => {
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
  } = useTable('competitionTypesTable')

  const [filters, setFilters] = useLocalStorage<CompetitionTypesFiltersDto>({
    key: 'competition-types-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: CompetitionTypesFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: competitionTypes, isLoading: dataLoading } =
    useCompetitionTypes({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as CompetitionTypesSortBy,
      sortingOrder: order,
      ...filters,
    })

  const { mutate: deleteCompetitionType, isLoading: deleteLoading } =
    useDeleteCompetitionType()

  const isLoading = dataLoading || deleteLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('competition-types:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <CompetitionTypesFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <CompetitionTypesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={competitionTypes?.totalDocs || 0}
        actions
      >
        {!!competitionTypes &&
          competitionTypes.docs.map(compType => (
            <CompetitionTypesTableRow
              key={compType.id}
              data={compType}
              onEditClick={() => {
                router.push(`/competition-types/edit/${compType.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: compType.id, name: compType.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </CompetitionTypesTable>
      <Fab href="/competition-types/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('competition-types:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deleteCompetitionType(toDeleteData.id)

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

export default CompetitionTypesPage
