import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { ReportBgImagesFilterForm } from '@/modules/report-background-images/forms/filter'
import {
  useDeleteReportBgImage,
  useReportBgImages,
} from '@/modules/report-background-images/hooks'
import { ReportBgImagesTableRow } from '@/modules/report-background-images/table/row'
import { ReportBgImagesTable } from '@/modules/report-background-images/table/table'
import {
  ReportBgImagesFiltersDto,
  ReportBgImagesSortBy,
} from '@/modules/report-background-images/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: ReportBgImagesFiltersDto = {
  name: '',
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'report-bg-images'],
  ['ADMIN'],
)

interface IToDeleteData {
  id: string
  name: string
}

const ReportBgImagesPage = ({ errorMessage, errorStatus }: TSsrRole) => {
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
  } = useTable('reportbgimagesTable')

  const [filters, setFilters] = useLocalStorage<ReportBgImagesFiltersDto>({
    key: 'report-bg-images-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: ReportBgImagesFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: reportBgImages, isLoading: dataLoading } = useReportBgImages({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as ReportBgImagesSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteReportBgImage, isLoading: deleteLoading } =
    useDeleteReportBgImage()

  const isLoading = dataLoading || deleteLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('report-bg-images:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <ReportBgImagesFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <ReportBgImagesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={reportBgImages?.totalDocs || 0}
        actions
      >
        {!!reportBgImages &&
          reportBgImages.docs.map(repImg => (
            <ReportBgImagesTableRow
              key={repImg.id}
              data={repImg}
              onEditClick={() => {
                router.push(`/report-background-images/edit/${repImg.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: repImg.id, name: repImg.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </ReportBgImagesTable>
      <Fab href="/report-background-images/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('report-bg-images:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deleteReportBgImage(toDeleteData.id)

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

export default ReportBgImagesPage
