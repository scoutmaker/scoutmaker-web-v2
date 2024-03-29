import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import {
  CreateReportIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  LikeIcon,
  LiveObservationIcon,
  UnlikeIcon,
  VideoIcon,
} from '@/components/icons'
import { LikedTableCell } from '@/components/likedTableCell/likedTableCell'
import { RatingChip } from '@/components/rating-chip/rating-chip'
import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import {
  getMatchDisplayName,
  getSingleMatchRoute,
} from '@/modules/matches/utils'
import { getPositionDisplayName } from '@/modules/player-positions/utils'
import { getSinglePlayerRoute } from '@/modules/players/utils'
import { IReportFromNoteQuery } from '@/modules/reports/types'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { getAuthorDisplayName } from '../../users/utils'
import { NoteDto } from '../types'
import { getNoteHref } from '../utils'

interface INotesTableRowProps {
  data: NoteDto
  onEditClick: () => void
  onDeleteClick?: () => void
  onLikeClick: (note: NoteDto) => void
  onUnlikeClick: (id: string) => void
  withoutActions?: boolean
}

export const NotesTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  onLikeClick,
  onUnlikeClick,
  withoutActions,
}: INotesTableRowProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isRowExpanded, setIsRowExpanded] = useState(false)

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const {
    id,
    author,
    createdAt,
    likes,
    description,
    match,
    percentageRating,
    player,
    shirtNo,
    meta,
    observationType,
    rating,
  } = data

  const cellChangeLikedClick = () => {
    if (likes.length) onUnlikeClick(id)
    else onLikeClick(data)
  }

  const createReportQueryData: IReportFromNoteQuery = {
    playerId: player?.id || '',
    matchId: match?.id,
    shirtNo,
    finalRating: rating,
    summary: description,
  }

  return (
    <>
      <StyledTableRow
        hover
        key={id}
        onClick={isMenuOpen ? undefined : () => router.push(getNoteHref(data))}
      >
        <StyledTableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            onClick={e => {
              e.stopPropagation()
              setIsRowExpanded(!isRowExpanded)
            }}
          >
            {isRowExpanded ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </StyledTableCell>
        {!withoutActions && (
          <StyledTableCell padding="checkbox">
            <TableMenu
              menuAnchorEl={menuAnchorEl}
              isMenuOpen={isMenuOpen}
              onMenuClick={handleMenuClick}
              onMenuClose={handleMenuClose}
              onDeleteClick={
                onDeleteClick
                  ? () => handleMenuAction(onDeleteClick)
                  : undefined
              }
              onEditClick={() => handleMenuAction(onEditClick)}
            >
              {likes.length === 0 ? (
                <TableMenuItem
                  icon={<LikeIcon fontSize="small" />}
                  text={t('ADD_TO_FAVOURITES')}
                  onClick={() => {
                    handleMenuAction(cellChangeLikedClick)
                  }}
                />
              ) : (
                <TableMenuItem
                  icon={<UnlikeIcon fontSize="small" />}
                  text={t('REMOVE_FROM_FAVOURITES')}
                  onClick={() => {
                    handleMenuAction(cellChangeLikedClick)
                  }}
                />
              )}
              <TableMenuItem
                icon={<CreateReportIcon fontSize="small" />}
                text={t('notes:CREATE_REPORT')}
                onClick={() =>
                  router.push({
                    pathname: '/reports/create',
                    query: createReportQueryData as Record<string, any>,
                  })
                }
              />
            </TableMenu>
          </StyledTableCell>
        )}
        <LikedTableCell
          isLiked={!!likes.length}
          onClicked={cellChangeLikedClick}
        />
        <StyledTableCell>
          {match ? formatDate(match.date) : '-'}
        </StyledTableCell>
        {match ? (
          <CellWithLink
            href={getSingleMatchRoute(match.id)}
            label={getMatchDisplayName({
              homeTeamName: match.homeTeam.name,
              awayTeamName: match.awayTeam.name,
              date: match.date,
            })}
          />
        ) : (
          <StyledTableCell>-</StyledTableCell>
        )}
        <StyledTableCell>
          {percentageRating ? (
            <RatingChip
              rating={parseInt(((percentageRating * 4) / 100).toFixed())}
            />
          ) : null}
        </StyledTableCell>
        {player ? (
          <CellWithLink
            href={getSinglePlayerRoute(player.slug)}
            label={`${player.firstName} ${player.lastName}`}
          />
        ) : (
          <StyledTableCell>-</StyledTableCell>
        )}
        <StyledTableCell>
          {meta?.position ? getPositionDisplayName(meta.position) : '-'}
        </StyledTableCell>
        <StyledTableCell>{getAuthorDisplayName(author)}</StyledTableCell>
        <StyledTableCell padding="checkbox" align="center">
          {observationType === 'LIVE' ? <LiveObservationIcon /> : <VideoIcon />}
        </StyledTableCell>
        <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
                {`Nr ${shirtNo || 'N/A'}, ${
                  meta?.position && meta.position.name
                } (${meta?.team && meta.team.name})`}
              </Typography>
              <Typography gutterBottom variant="body2">
                {description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
