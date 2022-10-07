import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionJuniorLevelsFilterForm } from '@/modules/competition-junior-levels/forms/filter'
import {
  useCompetitionJuniorLevels,
  useDeleteCompetitionJuniorLevel,
} from '@/modules/competition-junior-levels/hooks'
import { CompetitionJuniorLevelsTableRow } from '@/modules/competition-junior-levels/table/row'
import { CompetitionJuniorLevelsTable } from '@/modules/competition-junior-levels/table/table'
import {
  CompetitionJuniorLevelsFiltersDto,
  CompetitionJuniorLevelsSortBy,
} from '@/modules/competition-junior-levels/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: CompetitionJuniorLevelsFiltersDto = {
  name: '',
  // @ts-ignore so its empty
  level: '',
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'comp-junior-levels'],
  ['ADMIN'],
)

interface IToDeleteData {
  id: string
  name: string
}

const CompetitionJuniorLevelsPage = ({
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
  } = useTable('compJuniorLevelsTable')

  const [filters, setFilters] =
    useLocalStorage<CompetitionJuniorLevelsFiltersDto>({
      key: 'comp-junior-levels-filters',
      initialValue: initialFilters,
    })

  function handleSetFilters(newFilters: CompetitionJuniorLevelsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: compJuniorLevels, isLoading: dataLoading } =
    useCompetitionJuniorLevels({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as CompetitionJuniorLevelsSortBy,
      sortingOrder: order,
      ...filters,
    })

  const { mutate: deleteCompJuniorLevel, isLoading: deleteLoading } =
    useDeleteCompetitionJuniorLevel()

  const isLoading = dataLoading || deleteLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('comp-junior-levels:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <CompetitionJuniorLevelsFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <CompetitionJuniorLevelsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={compJuniorLevels?.totalDocs || 0}
        actions
      >
        {!!compJuniorLevels &&
          compJuniorLevels.docs.map(comp => (
            <CompetitionJuniorLevelsTableRow
              key={comp.id}
              data={comp}
              onEditClick={() => {
                router.push(`/competition-junior-levels/edit/${comp.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: comp.id, name: comp.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </CompetitionJuniorLevelsTable>
      <Fab href="/competition-junior-levels/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('comp-junior-levels:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deleteCompJuniorLevel(toDeleteData.id)

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

export default CompetitionJuniorLevelsPage
