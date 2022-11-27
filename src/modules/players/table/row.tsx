import {
  Assessment as ReportsIcon,
  Favorite as UnlikeIcon,
  FavoriteBorder as LikeIcon,
  Note as NotesIcon,
} from '@mui/icons-material'
import { Badge, Link as MUILink } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { LikedTableCell } from '@/components/likedTableCell/likedTableCell'
import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { getFlagEmoji } from '@/utils/get-flag-emoji'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { PlayerDto } from '../types'

interface IPlayersTableRowProps {
  data: PlayerDto
  onEditClick: () => void
  onDeleteClick: () => void
  onLikeClick: (id: string) => void
  onUnlikeClick: (id: string) => void
}

export const PlayersTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  onLikeClick,
  onUnlikeClick,
}: IPlayersTableRowProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const {
    id,
    slug,
    likes,
    firstName,
    lastName,
    primaryPosition,
    teams,
    footed,
    height,
    weight,
    country,
    yearOfBirth,
    _count: count,
  } = data

  const cellChangeLikedClick = () => {
    if (likes.length) onUnlikeClick(id)
    else onLikeClick(id)
  }

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/players/${slug}`)}
    >
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
      <LikedTableCell
        isLiked={!!likes.length}
        onClicked={cellChangeLikedClick}
      />
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{firstName}</StyledTableCell>
      <StyledTableCell sx={{ minWidth: 100 }}>{`${getFlagEmoji(country.code)} ${
        country.name
      }`}</StyledTableCell>
      <StyledTableCell sx={{ minWidth: 150 }}>
        <Link href={`/teams/${teams[0]?.team?.slug}`} passHref>
          <MUILink onClick={e => e.stopPropagation()}>
            {teams[0]?.team?.name}
          </MUILink>
        </Link>
      </StyledTableCell>
      <StyledTableCell>{primaryPosition.name}</StyledTableCell>
      <StyledTableCell>{yearOfBirth}</StyledTableCell>
      <StyledTableCell>{height}</StyledTableCell>
      <StyledTableCell>{weight}</StyledTableCell>
      <StyledTableCell>{t(footed)}</StyledTableCell>
      <StyledTableCell align="center">
        <Badge badgeContent={count.reports || '0'} color="secondary">
          <NotesIcon />
        </Badge>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Badge badgeContent={count.notes || '0'} color="secondary">
          <ReportsIcon />
        </Badge>
      </StyledTableCell>
    </StyledTableRow>
  )
}
