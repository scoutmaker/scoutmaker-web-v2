import {
  Favorite as UnlikeIcon,
  FavoriteBorder as LikeIcon,
} from '@mui/icons-material'
import { Link as MUILink } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { LikedTableCell } from '@/components/likedTableCell/likedTableCell'
import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { TeamDto } from '@/modules/teams/types'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

interface ITeamsTableRowProps {
  data: TeamDto
  onEditClick: () => void
  onDeleteClick: () => void
  onLikeClick: (id: string) => void
  onUnlikeClick: (id: string) => void
  actions?: boolean
}

export const TeamsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  onLikeClick,
  onUnlikeClick,
  actions,
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

  const cellChangeLikedClick = () => {
    if (likes.length) onUnlikeClick(id)
    else onLikeClick(id)
  }

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/teams/${slug}`)}
    >
      {actions && (
        <StyledTableCell padding="checkbox">
          <TableMenu
            menuAnchorEl={menuAnchorEl}
            isMenuOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            onDeleteClick={() => handleMenuAction(onDeleteClick)}
            onEditClick={() => handleMenuAction(onEditClick)}
          >
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
      )}
      <LikedTableCell
        isLiked={!!likes.length}
        onClicked={cellChangeLikedClick}
      />
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
