import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps } from '@/types/tables'

import { ClubDto, ClubsSortBy } from '../types'
import { ClubsTableRow } from './row'

// This should be generic, we just need the id and display name for every module
interface IClubToDeleteData {
  id: string
  name: string
}

interface IClubsTableProps extends ICommonTableProps {
  data: ClubDto[]
  handleDeleteItemClick: (data: IClubToDeleteData) => void
}

interface IHeadCell {
  id: ClubsSortBy
  label: string
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'countryId', label: t('COUNTRY') },
    { id: 'regionId', label: t('REGION') },
  ]
}

export const ClubsTable = ({
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
}: IClubsTableProps) => {
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
      {data.map(club => (
        <ClubsTableRow
          key={club.id}
          data={club}
          onEditClick={() => {
            router.push(`/clubs/edit/${club.slug}`)
          }}
          onDeleteClick={() =>
            handleDeleteItemClick({ id: club.id, name: club.name })
          }
          isEditOptionEnabled
          isDeleteOptionEnabled
        />
      ))}
    </Table>
  )
}
