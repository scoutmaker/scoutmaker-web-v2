import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { CountryDto } from '../types'
import { CountriesTableRow } from './countries-row'

interface ICountriesTableProps extends ICommonTableProps {
  data: CountryDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'code', label: t('countries:CODE') },
    { id: 'isEuMember', label: t('countries:IS_EU_MEMBER') },
  ]
}

export const CountriesTable = ({
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
}: ICountriesTableProps) => {
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
      {data.map(country => (
        <CountriesTableRow
          key={country.id}
          data={country}
          onEditClick={() => router.push(`/countries/edit/${country.id}`)}
          onDeleteClick={() =>
            handleDeleteItemClick({ id: country.id, name: country.name })
          }
        />
      ))}
    </Table>
  )
}
