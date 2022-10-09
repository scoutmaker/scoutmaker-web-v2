import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { CompetitionTypeDto } from '../types'
import { CompetitionTypesTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: CompetitionTypeDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [{ id: 'name', label: t('NAME') }]
}

export const CompetitionTypesTable = ({
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
      {data.map(compType => (
        <CompetitionTypesTableRow
          key={compType.id}
          data={compType}
          onEditClick={() =>
            router.push(`/competition-types/edit/${compType.id}`)
          }
          onDeleteClick={() =>
            handleDeleteItemClick({ id: compType.id, name: compType.name })
          }
        />
      ))}
    </Table>
  )
}
