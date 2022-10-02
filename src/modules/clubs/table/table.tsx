import { useTranslation } from 'next-i18next'

import { generateBasicTable } from '@/components/basicTable/table'
import { ICommonTableProps } from '@/types/tables'

import { ClubDto } from '../types'
import { ClubsTableRow } from './row'

interface IClubsTableProps extends ICommonTableProps {
  data: ClubDto[]
  onDeleteClick: (id: string, name: string) => void
}

export const ClubsTable = (props: IClubsTableProps) => {
  const { t } = useTranslation()
  const Table = generateBasicTable([
    { id: 'name', label: t('NAME') },
    { id: 'countryId', label: t('COUNTRY') },
    { id: 'regionId', label: t('REGION') },
  ])

  const { data, onDeleteClick } = props
  return (
    <Table {...props}>
      {data.map(club => (
        <ClubsTableRow data={club} onDeleteClick={onDeleteClick} />
      ))}
    </Table>
  )
}
