import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { SeasonsFilterForm } from '@/modules/seasons/forms/filter'
import { useDeleteSeason, useSeasons, useSetActiveSeason, useUnSetActiveSeason } from '@/modules/seasons/hooks'
import { SeasonsTableRow } from '@/modules/seasons/table/row'
import { SeasonsTable } from '@/modules/seasons/table/table'
import { SeasonsFiltersDto, SeasonsSortBy } from '@/modules/seasons/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: SeasonsFiltersDto = {
  name: ''
}

export const getServerSideProps = withSessionSsrRole(['common', 'seasons'], ['ADMIN'])

interface IToDeleteData {
  id: number
  name: string
}

const SeasonsPage = ({ errorMessage, errorStatus }: TSsrRole) => {
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
  } = useTable('seasonsTable')

  const [filters, setFilters] = useLocalStorage<SeasonsFiltersDto>({
    key: 'seasons-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: SeasonsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: seasons, isLoading: dataLoading } = useSeasons({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as SeasonsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteSeason, isLoading: deleteLoading } = useDeleteSeason()

  const { mutate: setActiveSeason, isLoading: setActiveLoading } = useSetActiveSeason()
  const { mutate: unSetActiveSeason, isLoading: unSetActiveLoading } = useUnSetActiveSeason()

  const isLoading = dataLoading || deleteLoading || setActiveLoading || unSetActiveLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('seasons:INDEX_PAGE_TITLE')} />
      <SeasonsFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
      <SeasonsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={seasons?.totalDocs || 0}
        actions
      >
        {!!seasons &&
          seasons.docs.map(season => (
            <SeasonsTableRow
              key={season.id}
              data={season}
              onEditClick={() => {
                router.push(`/seasons/edit/${season.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: season.id, name: season.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              onSetActiveClick={(id: number) => setActiveSeason(id)}
              onUnSetActiveClick={(id: number) => unSetActiveSeason(id)}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))
        }
      </SeasonsTable>
      <Fab href="/seasons/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('seasons:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData)
            deleteSeason(toDeleteData.id)

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

export default SeasonsPage