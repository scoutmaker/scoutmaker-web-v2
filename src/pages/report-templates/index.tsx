import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { ReportTemplatesFilterForm } from '@/modules/report-templates/forms/filter'
import { useDeleteReportTemplate, useReportTemplates } from '@/modules/report-templates/hooks'
import { ReportTemplatesTableRow } from '@/modules/report-templates/table/row'
import { ReportTemplatesTable } from '@/modules/report-templates/table/table'
import { ReportTemplatesFiltersDto, ReportTemplatesSortBy } from '@/modules/report-templates/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: ReportTemplatesFiltersDto = {
  name: ''
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'report-templates'],
  false,
)

interface IToDeleteData {
  id: string
  name: string
}

const ReportTemplatesPage = ({ errorMessage, errorStatus }: TSsrRole) => {
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
  } = useTable('reportTemplatesTable')

  const [filters, setFilters] = useLocalStorage<ReportTemplatesFiltersDto>({
    key: 'report-templates-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: ReportTemplatesFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: reportTemplates, isLoading: dataLoading } = useReportTemplates({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as ReportTemplatesSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteTemplate, isLoading: deleteLoading } = useDeleteReportTemplate()

  const isLoading =
    dataLoading || deleteLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('report-templates:INDEX_PAGE_TITLE')} />
      <ReportTemplatesFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
      <ReportTemplatesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={reportTemplates?.totalDocs || 0}
        actions
      >
        {!!reportTemplates &&
          reportTemplates.docs.map(template => (
            <ReportTemplatesTableRow
              key={template.id}
              data={template}
              onEditClick={() => {
                router.push(`/report-templates/edit/${template.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: template.id, name: template.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </ReportTemplatesTable>
      <Fab href="/report-templates/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('report-templates:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deleteTemplate(toDeleteData.id)

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

export default ReportTemplatesPage
