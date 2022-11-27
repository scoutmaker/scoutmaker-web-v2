import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { SeasonDto } from '../types'
import { SeasonsTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: SeasonDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
  onSetActiveClick: (id: string) => void
  onUnSetActiveClick: (id: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'startDate', label: t('seasons:START_DATE') },
    { id: 'endDate', label: t('seasons:END_DATE') },
    { id: 'isActive', label: t('seasons:IS_ACTIVE') },
  ]
}

export const SeasonsTable = ({
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
  onSetActiveClick,
  onUnSetActiveClick,
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
      {data.map(season => (
        <SeasonsTableRow
          key={season.id}
          data={season}
          onEditClick={() => router.push(`/seasons/edit/${season.id}`)}
          onDeleteClick={() =>
            handleDeleteItemClick({ id: season.id, name: season.name })
          }
          onSetActiveClick={onSetActiveClick}
          onUnSetActiveClick={onUnSetActiveClick}
        />
      ))}
    </Table>
  )
}
