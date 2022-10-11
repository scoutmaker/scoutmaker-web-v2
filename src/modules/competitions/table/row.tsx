import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { CompetitionDto } from '../types'

interface ITableRowProps {
  data: CompetitionDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const CompetitionsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
}: ITableRowProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, name, gender, type, level, ageCategory, juniorLevel, country } =
    data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen ? undefined : () => router.push(`/competitions/${id}`)
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
      <StyledTableCell>{t(`${gender}SHORT`)}</StyledTableCell>
      <StyledTableCell>{type.name}</StyledTableCell>
      <StyledTableCell>{country.name}</StyledTableCell>
      <StyledTableCell>{level}</StyledTableCell>
      <StyledTableCell>{ageCategory.name}</StyledTableCell>
      <StyledTableCell>{juniorLevel?.name}</StyledTableCell>
    </StyledTableRow>
  )
}
