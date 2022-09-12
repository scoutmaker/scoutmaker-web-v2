import {
  Add as AddIcon,
  ContentCopy as CopyIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { SeasonDto } from '../types'

interface ITableRowProps {
  data: SeasonDto
  onEditClick: () => void
  onDeleteClick: () => void
  isEditOptionEnabled: boolean
  isDeleteOptionEnabled: boolean
  onSetActiveClick: (id: string) => void
  onUnSetActiveClick: (id: string) => void
}

export const SeasonsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
  onSetActiveClick,
  onUnSetActiveClick,
}: ITableRowProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, name, endDate, startDate, isActive } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/seasons/${id}`)}
    >
      <StyledTableCell padding="checkbox">
        <TableMenu
          menuAnchorEl={menuAnchorEl}
          isMenuOpen={isMenuOpen}
          onMenuClick={handleMenuClick}
          onMenuClose={handleMenuClose}
        >
          <TableMenuItem
            icon={<EditIcon fontSize="small" />}
            text={t('EDIT')}
            onClick={() => {
              handleMenuAction(onEditClick)
            }}
            disabled={!isEditOptionEnabled}
          />
          <TableMenuItem
            icon={<DeleteIcon fontSize="small" />}
            text={t('DELETE')}
            onClick={() => {
              handleMenuAction(onDeleteClick)
            }}
            disabled={!isDeleteOptionEnabled}
          />
          <TableMenuItem
            icon={<CopyIcon fontSize="small" />}
            text={t('seasons:COPY_TO_NEW')}
            onClick={() =>
              router.push(`/competition-participations/copy?fromId=${id}`)
            }
          />
          {!isActive ? (
            <TableMenuItem
              icon={<AddIcon fontSize="small" />}
              text={t('seasons:SET_ACTIVE')}
              onClick={() => {
                handleMenuAction(() => onSetActiveClick(id))
              }}
            />
          ) : (
            <TableMenuItem
              icon={<RemoveIcon fontSize="small" />}
              text={t('seasons:UNSET_ACTIVE')}
              onClick={() => {
                handleMenuAction(() => onUnSetActiveClick(id))
              }}
            />
          )}
        </TableMenu>
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{formatDate(startDate)}</StyledTableCell>
      <StyledTableCell>{formatDate(endDate)}</StyledTableCell>
      <StyledTableCell>{isActive ? t('YES') : t('NO')}</StyledTableCell>
    </StyledTableRow>
  )
}
