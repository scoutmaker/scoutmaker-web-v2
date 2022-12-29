import { Print as PrintIcon } from '@mui/icons-material'
import {
  Box,
  Collapse,
  IconButton,
  Link,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import {
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
import {
  getPlayerFullName,
  getSinglePlayerRoute,
} from '@/modules/players/utils'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { StatusChip } from '../status-chip'
import { ReportPaginatedDataDto } from '../types'
import { getSingleReportRoute } from '../utils'

interface IReportsTableRowProps {
  data: ReportPaginatedDataDto
  onEditClick: () => void
  onDeleteClick?: () => void
  onLikeClick: (report: ReportPaginatedDataDto) => void
  onUnlikeClick: (id: string) => void
  withoutActions?: boolean
}

export const ReportsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  onLikeClick,
  onUnlikeClick,
  withoutActions,
}: IReportsTableRowProps) => {
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
    match,
    percentageRating,
    player,
    videoDescription,
    status,
    videoUrl,
    summary,
    meta,
    observationType,
  } = data

  const cellChangeLikedClick = () => {
    if (likes.length) onUnlikeClick(id)
    else onLikeClick(data)
  }

  return (
    <>
      <StyledTableRow
        hover
        key={id}
        onClick={
          isMenuOpen ? undefined : () => router.push(getSingleReportRoute(id))
        }
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
                icon={<PrintIcon fontSize="small" />}
                text={t('reports:PRINT')}
                onClick={() => {
                  handleMenuAction(() => router.push(`/reports/${id}/print`))
                }}
              />
            </TableMenu>
          </StyledTableCell>
        )}
        <LikedTableCell
          isLiked={!!likes.length}
          onClicked={cellChangeLikedClick}
        />
        {player ? (
          <CellWithLink
            href={getSinglePlayerRoute(player.slug)}
            label={getPlayerFullName({
              firstName: player.firstName,
              lastName: player.lastName,
            })}
          />
        ) : (
          <StyledTableCell>-</StyledTableCell>
        )}
        <StyledTableCell>{meta?.position?.name || '-'}</StyledTableCell>
        <StyledTableCell>
          {percentageRating ? (
            <RatingChip
              rating={parseInt(((percentageRating * 4) / 100).toFixed())}
            />
          ) : (
            '-'
          )}
        </StyledTableCell>
        {match ? (
          <CellWithLink
            href={getSingleMatchRoute(match.id)}
            label={getMatchDisplayName({
              homeTeamName: match.homeTeam.name,
              awayTeamName: match.awayTeam.name,
            })}
          />
        ) : (
          <StyledTableCell>-</StyledTableCell>
        )}
        <StyledTableCell>
          {videoUrl ? (
            <Tooltip title={videoDescription || 'video'}>
              <Link
                href={videoUrl}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <VideoIcon />
              </Link>
            </Tooltip>
          ) : (
            '-'
          )}
        </StyledTableCell>
        <StyledTableCell>
          {match ? formatDate(match.date) : '-'}
        </StyledTableCell>
        <StyledTableCell>{`${author.firstName} ${author.lastName}`}</StyledTableCell>
        <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
        <StyledTableCell>
          <StatusChip status={status} />
        </StyledTableCell>
        <StyledTableCell padding="checkbox" align="center">
          {observationType === 'LIVE' ? <LiveObservationIcon /> : <VideoIcon />}
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
                {`${getPlayerFullName({
                  firstName: player.firstName,
                  lastName: player.lastName,
                })}, ${meta?.position && meta.position.name} (${
                  meta?.team && meta.team.name
                })`}
              </Typography>
              <Typography gutterBottom variant="body2">
                {summary}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
