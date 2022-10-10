import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'
import { getEditRoute, Routes } from '@/utils/routes'

import { ReportSkillAssessmentCategoryDto } from '../types'
import { ReportSkillAssessmentCategoriesTableRow } from './report-skill-assessment-categories-row'

interface IReportSkillAssessmentCategoriesTableProps extends ICommonTableProps {
  data: ReportSkillAssessmentCategoryDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [{ id: 'name', label: t('NAME') }]
}

export const ReportSkillAssessmentCategoriesTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  total,
  actions,
  data,
  handleDeleteItemClick,
}: IReportSkillAssessmentCategoriesTableProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Table
      page={page}
      rowsPerPage={rowsPerPage}
      sortBy={sortBy}
      order={order}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleSort={handleSort}
      total={total}
      headCells={generateHeadCells(t)}
      actions={actions}
    >
      {data.map(category => (
        <ReportSkillAssessmentCategoriesTableRow
          key={category.id}
          data={category}
          onEditClick={() =>
            router.push(
              getEditRoute(
                Routes.REPORT_SKILL_ASSESSMENT_CATEGORIES,
                category.id,
              ),
            )
          }
          onDeleteClick={() =>
            handleDeleteItemClick({
              id: category.id,
              name: category.name,
            })
          }
        />
      ))}
    </Table>
  )
}
