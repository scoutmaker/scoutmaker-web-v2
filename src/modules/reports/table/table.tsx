import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'
import { getEditRoute, Routes } from '@/utils/routes'

import { ReportPaginatedDataDto, ReportsSortBy } from '../types'
import { ReportsTableRow } from './row'

interface IReportsTableProps extends ICommonTableProps {
  data: ReportPaginatedDataDto[]
  handleDeleteItemClick?: (data: {
    id: string
    docNumber: number
    createdAt: string
  }) => void
  onLikeClick: (report: ReportPaginatedDataDto) => void
  onUnLikeClick: (id: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell<ReportsSortBy>[] {
  return [
    { id: undefined, label: '', isSortingDisabled: true },
    { id: 'match', label: t('MATCH_DATE') },
    { id: undefined, label: t('MATCH'), isSortingDisabled: true },
    { id: 'percentageRating', label: t('RATING') },
    { id: 'player', label: t('PLAYER') },
    { id: 'positionPlayed', label: t('POSITION') },
    { id: 'author', label: t('SCOUT') },
    { id: undefined, label: t('OBSERVATION'), isSortingDisabled: true },
    { id: 'createdAt', label: t('CREATED_AT') },
  ]
}

export const ReportsTable = ({
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
  onLikeClick,
  onUnLikeClick,
}: IReportsTableProps) => {
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
      collapsible
    >
      {data.map(report => (
        <ReportsTableRow
          key={report.id}
          data={report}
          onEditClick={() =>
            router.push(getEditRoute(Routes.REPORTS, report.id))
          }
          onDeleteClick={
            handleDeleteItemClick
              ? () =>
                  handleDeleteItemClick({
                    id: report.id,
                    docNumber: report.docNumber,
                    createdAt: report.createdAt,
                  })
              : undefined
          }
          onLikeClick={onLikeClick}
          onUnlikeClick={onUnLikeClick}
          withoutActions={!actions}
        />
      ))}
    </Table>
  )
}
