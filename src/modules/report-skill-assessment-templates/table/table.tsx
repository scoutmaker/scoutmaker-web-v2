import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { ReportSkillAssessmentTemplateDto } from '../types'
import { ReportSkillAssessmentTemplatesTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: ReportSkillAssessmentTemplateDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'category', label: t('CATEGORY') },
    {
      id: 'hasScore',
      label: t('report-skill-assessment-templates:HAS_SCORE'),
      isSortingDisabled: true,
    },
  ]
}

export const ReportSkillAssessmentTemplatesTable = ({
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
}: ITableProps) => {
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
      {data.map(report => (
        <ReportSkillAssessmentTemplatesTableRow
          key={report.id}
          data={report}
          onEditClick={() =>
            router.push(`/report-skill-assessment-templates/edit/${report.id}`)
          }
          onDeleteClick={() =>
            handleDeleteItemClick({ id: report.id, name: report.name })
          }
        />
      ))}
    </Table>
  )
}
