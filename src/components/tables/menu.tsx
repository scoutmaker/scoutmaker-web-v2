import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MenuIcon,
} from '@mui/icons-material'
import { IconButton, Menu, MenuList, Tooltip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { MouseEvent, ReactNode } from 'react'

import { TableMenuItem } from './menu-item'

interface ITableMenuProps {
  children?: ReactNode
  menuAnchorEl: Element | null
  isMenuOpen: boolean
  onMenuClick: (e: MouseEvent<HTMLElement>) => void
  onMenuClose: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
}

export const TableMenu = ({
  children,
  menuAnchorEl,
  isMenuOpen,
  onMenuClick,
  onMenuClose,
  onDeleteClick,
  onEditClick,
}: ITableMenuProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <Tooltip title="Menu">
        <IconButton
          aria-label="open-menu"
          aria-controls="row-menu"
          aria-haspopup="true"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="row-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={onMenuClose}
      >
        <MenuList>
          {!!onEditClick && (
            <TableMenuItem
              icon={<EditIcon fontSize="small" />}
              text={t('EDIT')}
              onClick={onEditClick}
            />
          )}
          {!!onDeleteClick && (
            <TableMenuItem
              icon={<DeleteIcon fontSize="small" />}
              text={t('DELETE')}
              onClick={onDeleteClick}
            />
          )}
          {children}
        </MenuList>
      </Menu>
    </div>
  )
}
