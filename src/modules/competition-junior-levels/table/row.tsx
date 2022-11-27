import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { CompetitionJuniorLevelDto } from '../types'

interface ITableRowProps {
  data: CompetitionJuniorLevelDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const CompetitionJuniorLevelsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
}: ITableRowProps) => {
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, name, level } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen
          ? undefined
          : () => router.push(`/competition-junior-levels/${id}`)
      }
    >
      <StyledTableCell padding="checkbox">
        <TableMenu
          menuAnchorEl={menuAnchorEl}
          isMenuOpen={isMenuOpen}
          onMenuClick={handleMenuClick}
          onMenuClose={handleMenuClose}
          onDeleteClick={() => handleMenuAction(onDeleteClick)}
          onEditClick={() => handleMenuAction(onEditClick)}
        />
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{level}</StyledTableCell>
    </StyledTableRow>
  )
}
