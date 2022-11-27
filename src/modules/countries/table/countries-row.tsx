import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { CountryDto } from '../types'

interface ICountriesTableRowProps {
  data: CountryDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const CountriesTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
}: ICountriesTableRowProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, name, code, isEuMember } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/countries/${id}`)}
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
      <StyledTableCell>{code}</StyledTableCell>
      <StyledTableCell>{isEuMember ? t('YES') : t('NO')}</StyledTableCell>
    </StyledTableRow>
  )
}
