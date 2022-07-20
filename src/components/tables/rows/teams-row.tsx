import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Favorite as UnlikeIcon,
  FavoriteBorder as LikeIcon,
} from '@mui/icons-material'
import { Link as MUILink } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useTableMenu } from '@/lib/use-table-menu'
import { TeamDto } from '@/types/teams'

import { StyledTableCell } from '../common/cell'
import { TableMenu } from '../common/menu'
import { TableMenuItem } from '../common/menu-item'
import { StyledTableRow } from '../common/row'

interface ITeamsTableRowProps {
  data: TeamDto
  onEditClick: () => void
  onDeleteClick: () => void
  onLikeClick: (id: number) => void
  onUnlikeClick: (id: number) => void
  isEditOptionEnabled: boolean
  isDeleteOptionEnabled: boolean
}

export const TeamsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  onLikeClick,
  onUnlikeClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
}: ITeamsTableRowProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, name, slug, club, competitions, likes } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/teams/${slug}`)}
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
          {likes.length === 0 ? (
            <TableMenuItem
              icon={<LikeIcon fontSize="small" />}
              text={t('ADD_TO_FAVOURITES')}
              onClick={() => {
                handleMenuAction(() => onLikeClick(id))
              }}
            />
          ) : (
            <TableMenuItem
              icon={<UnlikeIcon fontSize="small" />}
              text={t('REMOVE_FROM_FAVOURITES')}
              onClick={() => {
                handleMenuAction(() => onUnlikeClick(id))
              }}
            />
          )}
        </TableMenu>
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>
        <Link href={`/clubs/${club.slug}`} passHref>
          <MUILink onClick={e => e.stopPropagation()}>{club.name}</MUILink>
        </Link>
      </StyledTableCell>
      <StyledTableCell>{competitions[0]?.competition?.name}</StyledTableCell>
      <StyledTableCell>{competitions[0]?.group?.name}</StyledTableCell>
    </StyledTableRow>
  )
}
