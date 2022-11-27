import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { RegionDto } from '../types'
import { RegionsTableRow } from './regions-row'

interface IRegionsTableProps extends ICommonTableProps {
  data: RegionDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'countryId', label: t('COUNTRY') },
  ]
}

export const RegionsTable = ({
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
}: IRegionsTableProps) => {
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
      {data.map(region => (
        <RegionsTableRow
          key={region.id}
          data={region}
          onEditClick={() => router.push(`/regions/edit/${region.id}`)}
          onDeleteClick={() =>
            handleDeleteItemClick({ id: region.id, name: region.name })
          }
        />
      ))}
    </Table>
  )
}
