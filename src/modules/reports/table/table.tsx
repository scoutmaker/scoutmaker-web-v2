import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'
import { getEditRoute, Routes } from '@/utils/routes'

import { ReportPaginatedDataDto } from '../types'
import { ReportsTableRow } from './row'

interface IReportsTableProps extends ICommonTableProps {
  data: ReportPaginatedDataDto[]
  handleDeleteItemClick: (data: {
    id: string
    docNumber: number
    createdAt: string
  }) => void
  onLikeClick: (id: string) => void
  onUnLikeClick: (id: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'favourite', label: '' },
    { id: 'player', label: t('PLAYER') },
    { id: 'positionPlayed', label: t('POSITION') },
    { id: 'percentageRating', label: t('RATING') },
    { id: 'match', label: t('MATCH') },
    { id: 'videoUrl', label: t('VIDEO') },
    { id: 'matchDate', label: t('MATCH_DATE'), isSortingDisabled: true },
    { id: 'author', label: t('AUTHOR') },
    { id: 'createdAt', label: t('CREATED_AT') },
    { id: 'status', label: t('STATUS') },
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
          onDeleteClick={() =>
            handleDeleteItemClick({
              id: report.id,
              docNumber: report.docNumber,
              createdAt: report.createdAt,
            })
          }
          onLikeClick={onLikeClick}
          onUnlikeClick={onUnLikeClick}
        />
      ))}
    </Table>
  )
}
