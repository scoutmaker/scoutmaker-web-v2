import {
  Assessment as ReportsIcon,
  Favorite as UnlikeIcon,
  FavoriteBorder as LikeIcon,
  Note as NotesIcon,
} from '@mui/icons-material'
import { Badge } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { LikedTableCell } from '@/components/likedTableCell/likedTableCell'
import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { getPositionDisplayName } from '@/modules/player-positions/utils'
import { calculateRating } from '@/utils/calculate-rating'
import { getFlagEmoji } from '@/utils/get-flag-emoji'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { PlayerDto } from '../types'

interface IPlayersTableRowProps {
  data: PlayerDto
  onEditClick: () => void
  onDeleteClick: () => void
  onLikeClick: (id: string) => void
  onUnlikeClick: (id: string) => void
  showRole?: boolean
}

export const PlayersTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  onLikeClick,
  onUnlikeClick,
  showRole,
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
    country,
    yearOfBirth,
    _count: count,
    averagePercentageRating,
    role,
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
      <StyledTableCell sx={{ minWidth: 100 }}>{`${getFlagEmoji(country.code)} ${
        country.name
      }`}</StyledTableCell>
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{firstName}</StyledTableCell>
      <CellWithLink
        href={`/teams/${teams[0]?.team?.slug}`}
        label={teams[0]?.team?.name}
      />
      <StyledTableCell>{yearOfBirth}</StyledTableCell>
      <StyledTableCell>
        {getPositionDisplayName(primaryPosition)}
        {showRole && role && (
          <>
            <br />({role.name})
          </>
        )}
      </StyledTableCell>
      <StyledTableCell>{t(footed)}</StyledTableCell>
      <StyledTableCell>
        {typeof averagePercentageRating === 'number'
          ? calculateRating(averagePercentageRating)
          : '-'}
      </StyledTableCell>
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
