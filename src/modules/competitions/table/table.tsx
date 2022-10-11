import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { CompetitionDto } from '../types'
import { CompetitionsTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: CompetitionDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'gender', label: t('GENDER') },
    { id: 'type', label: t('COMPETITION_TYPE') },
    { id: 'country', label: t('COUNTRY') },
    { id: 'level', label: t('LEVEL') },
    { id: 'ageCategory', label: t('COMPETITION_AGE_CATEGORY') },
    { id: 'juniorLevel', label: t('COMPETITION_JUNIOR_LEVEL') },
  ]
}

export const CompetitionsTable = ({
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
        <CompetitionsTableRow
          key={comp.id}
          data={comp}
          onEditClick={() => router.push(`/competitions/edit/${comp.id}`)}
          onDeleteClick={() =>
            handleDeleteItemClick({ id: comp.id, name: comp.name })
          }
        />
      ))}
    </Table>
  )
}
