import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { ReportTemplateDto } from '../types'
import { ReportTemplatesTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: ReportTemplateDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    {
      id: 'maxRatingScore',
      label: t('MAX_RATING_SCORE'),
      isSortingDisabled: true,
    },
  ]
}

export const ReportTemplatesTable = ({
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
      {data.map(template => (
        <ReportTemplatesTableRow
          key={template.id}
          data={template}
          onEditClick={() =>
            router.push(`/report-templates/edit/${template.id}`)
          }
          onDeleteClick={() =>
            handleDeleteItemClick({ id: template.id, name: template.name })
          }
        />
      ))}
    </Table>
  )
}
