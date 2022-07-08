import { MouseEvent, ReactNode } from 'react'
import { IconButton, Menu, MenuList, Tooltip } from '@mui/material'
import { MoreVert as MenuIcon } from '@mui/icons-material'

interface ITableMenuProps {
  children: ReactNode
  menuAnchorEl: Element | null
  isMenuOpen: boolean
  onMenuClick: (e: MouseEvent<HTMLElement>) => void
  onMenuClose: () => void
}

export const TableMenu = ({
  children,
  menuAnchorEl,
  isMenuOpen,
  onMenuClick,
  onMenuClose,
}: ITableMenuProps) => (
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
      <MenuList>{children}</MenuList>
    </Menu>
  </div>
)
