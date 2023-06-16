import {
  Assessment as ReportsIcon,
  Favorite as UnlikeIcon,
  FavoriteBorder as LikeIcon,
  Note as NotesIcon,
} from '@mui/icons-material'
import { Badge, Box, Typography } from '@mui/material'
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
import { FlagEmoji } from '@/utils/get-flag-emoji'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { PlayerDto, PlayersFiltersDto } from '../types'
import { isPlayerGradeUpToDate } from '../utils'

interface IPlayersTableRowProps {
  data: PlayerDto
  onEditClick: () => void
  onDeleteClick: () => void
  onLikeClick: (id: string) => void
  onUnlikeClick: (id: string) => void
  showRole?: boolean
  recentAverageRatingFilter: PlayersFiltersDto['recentAverageRating']
}

export const PlayersTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  onLikeClick,
  onUnlikeClick,
  showRole,
  recentAverageRatingFilter,
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
    latestGrade,
    recentAveragePercentageRatings,
  } = data

  const cellChangeLikedClick = () => {
    if (likes.length) onUnlikeClick(id)
    else onLikeClick(id)
  }

  const avgRating = (() => {
    switch (recentAverageRatingFilter || '') {
      case 'LASTMONTH':
        return recentAveragePercentageRatings?.lastMonth
      case 'LAST3MONTHS':
        return recentAveragePercentageRatings?.last3Months
      case 'LAST6MONTHS':
        return recentAveragePercentageRatings?.last6Months
      case 'LAST12MONTHS':
        return recentAveragePercentageRatings?.last12Months
      default:
        return averagePercentageRating
    }
  })()

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
      <StyledTableCell sx={{ minWidth: 100 }}>
        <FlagEmoji code={country.code} />
        {country.name}
      </StyledTableCell>
      <CellWithLink href={`/players/${slug}`} label={lastName} />
      <CellWithLink href={`/players/${slug}`} label={firstName} />
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
      <StyledTableCell>{footed ? t(footed) : '-'}</StyledTableCell>
      <StyledTableCell>
        {latestGrade && isPlayerGradeUpToDate(latestGrade.createdAt) ? (
          <Box fontSize="inherit">
            <Typography fontSize="inherit">
              {t(`player-grades:${latestGrade.grade}`)}
            </Typography>
            <Typography variant="caption" marginLeft={0.5}>
              (akt.{' '}
              {Math.round(
                Math.abs(
                  new Date().getTime() -
                    new Date(latestGrade.createdAt).getTime(),
                ) / 8.64e7,
              )}{' '}
              dni temu)
            </Typography>
          </Box>
        ) : (
          '-'
        )}
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
      <StyledTableCell>
        {typeof avgRating === 'number' ? calculateRating(avgRating) : '-'}
      </StyledTableCell>
    </StyledTableRow>
  )
}
