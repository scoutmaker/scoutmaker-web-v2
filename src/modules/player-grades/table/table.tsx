import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { getPlayerFullName } from '@/modules/players/utils'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'
import { formatDate } from '@/utils/format-date'

import { PlayerGradeDto, PlayerGradesSortBy } from '../types'
import { PlayerGradesTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: PlayerGradeDto[]
  handleDeleteItemClick?: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell<PlayerGradesSortBy>[] {
  return [
    {
      id: 'player',
      label: t('PLAYER'),
    },
    { id: 'grade', label: t('GRADE') },
    { id: 'competition', label: t('COMPETITION') },
    { id: 'createdAt', label: t('CREATED_AT') },
  ]
}

export const PlayerGradesTable = ({
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
      {data.map(grade => (
        <PlayerGradesTableRow
          key={grade.id}
          data={grade}
          onEditClick={() => router.push(`/player-grades/edit/${grade.id}`)}
          onDeleteClick={
            handleDeleteItemClick
              ? () =>
                  handleDeleteItemClick({
                    id: grade.id,
                    name: `${getPlayerFullName(grade.player)} (${formatDate(
                      grade.createdAt,
                    )})`,
                  })
              : undefined
          }
          actions={actions}
        />
      ))}
    </Table>
  )
}
