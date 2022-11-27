import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { CompetitionGroupDto } from '../types'
import { CompetitionGroupsTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: CompetitionGroupDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'competition', label: t('COMPETITION') },
  ]
}

export const CompetitionGroupsTable = ({
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
      {data.map(group => (
        <CompetitionGroupsTableRow
          key={group.id}
          data={group}
          onEditClick={() =>
            router.push(`/competition-groups/edit/${group.id}`)
          }
          onDeleteClick={() =>
            handleDeleteItemClick({ id: group.id, name: group.name })
          }
        />
      ))}
    </Table>
  )
}
