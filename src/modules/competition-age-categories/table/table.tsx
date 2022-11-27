import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { CompetitionAgeCategortyDto } from '../types'
import { CompetitionAgeCategoriesTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: CompetitionAgeCategortyDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [{ id: 'name', label: t('NAME') }]
}

export const CompetitionAgeCategoriesTable = ({
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
      {data.map(item => (
        <CompetitionAgeCategoriesTableRow
          key={item.id}
          data={item}
          onEditClick={() =>
            router.push(`/competition-age-categories/edit/${item.id}`)
          }
          onDeleteClick={() =>
            handleDeleteItemClick({ id: item.id, name: item.name })
          }
        />
      ))}
    </Table>
  )
}
