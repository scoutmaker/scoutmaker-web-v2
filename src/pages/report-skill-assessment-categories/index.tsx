import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { ReportSkillAssessmentCategoriesFilterForm } from '@/modules/report-skill-assessment-categories/forms/filter'
import {
  useDeleteReportSkillAssessmentCategory,
  useReportSkillAssessmentCategories,
} from '@/modules/report-skill-assessment-categories/hooks'
import { ReportSkillAssessmentCategoriesTable } from '@/modules/report-skill-assessment-categories/table/report-skill-assessment-categories'
import {
  ReportSkillAssessmentCategoriesFiltersDto,
  ReportSkillAssessmentCategoriesSortBy,
} from '@/modules/report-skill-assessment-categories/types'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { getCreateRoute, Routes } from '@/utils/routes'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'report-skill-assessment-categories'],
  false,
)

const initialFilters: ReportSkillAssessmentCategoriesFiltersDto = {
  name: '',
}

const ReportSkillAssessmentCategoriesPage = ({
  errorStatus,
  errorMessage,
}: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [categoryToDeleteData, setCategoryToDeleteData] =
    useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('report-skill-assessments-table')

  const [filters, setFilters] =
    useLocalStorage<ReportSkillAssessmentCategoriesFiltersDto>({
      key: 'report-skill-assessment-categories-filters',
      initialValue: initialFilters,
    })

  const handleSetFilters = (
    newFilters: ReportSkillAssessmentCategoriesFiltersDto,
  ) => {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: categories, isLoading: categoriesLoading } =
    useReportSkillAssessmentCategories({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as ReportSkillAssessmentCategoriesSortBy,
      sortingOrder: order,
      ...filters,
    })

  const { mutate: deleteCategory, isLoading: deleteCategoryLoading } =
    useDeleteReportSkillAssessmentCategory()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setCategoryToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading = categoriesLoading || deleteCategoryLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={t('report-skill-assessment-categories:INDEX_PAGE_TITLE')}
      />
      <FilterAccordion>
        <ReportSkillAssessmentCategoriesFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <ReportSkillAssessmentCategoriesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={categories?.totalDocs || 0}
        actions
        data={categories?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href={getCreateRoute(Routes.REPORT_SKILL_ASSESSMENT_CATEGORIES)} />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t(
          'report-skill-assessment-categories:DELETE_CONFIRM_QUESTION',
          {
            name: categoryToDeleteData?.name,
          },
        )}
        handleAccept={() => {
          if (categoryToDeleteData) deleteCategory(categoryToDeleteData.id)

          setCategoryToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setCategoryToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default ReportSkillAssessmentCategoriesPage
