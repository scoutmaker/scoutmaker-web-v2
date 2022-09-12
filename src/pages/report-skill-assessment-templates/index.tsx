import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useReportSkillAssessmentCategoriesList } from '@/modules/report-skill-assessment-categories/hooks'
import { ReportSkillAssessmentTemplatesFilterForm } from '@/modules/report-skill-assessment-templates/forms/filter'
import {
  useDeleteReportSkillAssessmentTemplate,
  useReportSkillAssessmentTemplates,
} from '@/modules/report-skill-assessment-templates/hooks'
import { ReportSkillAssessmentTemplatesTableRow } from '@/modules/report-skill-assessment-templates/table/row'
import { ReportSkillAssessmentTemplatesTable } from '@/modules/report-skill-assessment-templates/table/table'
import {
  ReportSkillAssessmentTemplatesFiltersDto,
  ReportSkillAssessmentTemplatesSortBy,
} from '@/modules/report-skill-assessment-templates/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: ReportSkillAssessmentTemplatesFiltersDto = {
  name: '',
  categoryIds: [],
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'report-skill-assessment-templates'],
  false,
)

interface IToDeleteData {
  id: string
  name: string
}

const ReportSkillAssessmentTemplatesPage = ({
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
  } = useTable('ReportSkillAssessmentTemplatesTable')

  const [filters, setFilters] =
    useLocalStorage<ReportSkillAssessmentTemplatesFiltersDto>({
      key: 'report-skill-assessment-templates-filters',
      initialValue: initialFilters,
    })

  function handleSetFilters(
    newFilters: ReportSkillAssessmentTemplatesFiltersDto,
  ) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: reports, isLoading: dataLoading } =
    useReportSkillAssessmentTemplates({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as ReportSkillAssessmentTemplatesSortBy,
      sortingOrder: order,
      ...filters,
    })

  const { mutate: deleteReport, isLoading: deleteLoading } =
    useDeleteReportSkillAssessmentTemplate()

  const { data: categories, isLoading: categoriesLoading } =
    useReportSkillAssessmentCategoriesList()

  const isLoading = dataLoading || deleteLoading || categoriesLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={t('report-skill-assessment-templates:INDEX_PAGE_TITLE')}
      />
      <ReportSkillAssessmentTemplatesFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
        categoriesData={categories || []}
      />
      <ReportSkillAssessmentTemplatesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={reports?.totalDocs || 0}
        actions
      >
        {!!reports &&
          reports.docs.map(report => (
            <ReportSkillAssessmentTemplatesTableRow
              key={report.id}
              data={report}
              onEditClick={() => {
                router.push(
                  `/report-skill-assessment-templates/edit/${report.id}`,
                )
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: report.id, name: report.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </ReportSkillAssessmentTemplatesTable>
      <Fab href="/report-skill-assessment-templates/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t(
          'report-skill-assessment-templates:DELETE_CONFIRM_QUESTION',
          {
            name: toDeleteData?.name,
          },
        )}
        handleAccept={() => {
          if (toDeleteData) deleteReport(toDeleteData.id)

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

export default ReportSkillAssessmentTemplatesPage
