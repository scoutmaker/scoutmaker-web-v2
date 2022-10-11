import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { CompetitionJuniorLevelDto } from '../types'
import { CompetitionJuniorLevelsTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: CompetitionJuniorLevelDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'level', label: t('LEVEL') },
  ]
}

export const CompetitionJuniorLevelsTable = ({
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
      {data.map(comp => (
        <CompetitionJuniorLevelsTableRow
          key={comp.id}
          data={comp}
          onEditClick={() =>
            router.push(`/competition-junior-levels/edit/${comp.id}`)
          }
          onDeleteClick={() =>
            handleDeleteItemClick({ id: comp.id, name: comp.name })
          }
        />
      ))}
    </Table>
  )
}
