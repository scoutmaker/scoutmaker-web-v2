import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionJuniorLevelsFilterForm } from '@/modules/competition-junior-levels/forms/filter'
import {
  useCompetitionJuniorLevels,
  useDeleteCompetitionJuniorLevel,
} from '@/modules/competition-junior-levels/hooks'
import { CompetitionJuniorLevelsTable } from '@/modules/competition-junior-levels/table/table'
import {
  CompetitionJuniorLevelsFiltersDto,
  CompetitionJuniorLevelsSortBy,
} from '@/modules/competition-junior-levels/types'
import { INameToDeleteData } from '@/types/tables'
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

const CompetitionJuniorLevelsPage = ({
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

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading = dataLoading || deleteLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('comp-junior-levels:INDEX_PAGE_TITLE')} />
      <CompetitionJuniorLevelsFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
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
        data={compJuniorLevels?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
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
