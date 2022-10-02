import { useRouter } from 'next/router'

import { BasicTableRow } from '@/components/basicTable/row'
import { StyledTableCell } from '@/components/tables/cell'
import { ClubDto } from '@/modules/clubs/types'
import { getFlagEmoji } from '@/utils/get-flag-emoji'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

interface IClubsTableRowProps {
  data: ClubDto
  onDeleteClick: (id: string, name: string) => void
}

export const ClubsTableRow = ({ data, onDeleteClick }: IClubsTableRowProps) => {
  const router = useRouter()
  const tableMenuFns = useTableMenu()
  const { id, name, slug, region, country } = data

  return (
    <BasicTableRow
      key={id}
      href={`/clubs/${slug}`}
      isDeleteOptionEnabled
      isEditOptionEnabled
      onEditClick={() => router.push(`/clubs/edit/${slug}`)}
      onDeleteClick={() => onDeleteClick(id, name)}
      {...tableMenuFns}
    >
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{`${getFlagEmoji(country.code)} ${
        country.name
      }`}</StyledTableCell>
      <StyledTableCell>{region?.name}</StyledTableCell>
    </BasicTableRow>
  )
}
