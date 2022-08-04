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
  DeleteIcon,
  EditIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  LikeIcon,
  UnlikeIcon,
} from '@/components/icons'
import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { getDisplayName } from '@/modules/matches/utils'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { NoteDto } from '../types'

interface INotesTableRowProps {
  data: NoteDto
  onEditClick: () => void
  onDeleteClick: () => void
  onLikeClick: (id: number) => void
  onUnlikeClick: (id: number) => void
  isEditOptionEnabled: boolean
  isDeleteOptionEnabled: boolean
}

export const NotesTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  onLikeClick,
  onUnlikeClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
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
    maxRatingScore,
    percentageRating,
    player,
    rating,
    shirtNo,
  } = data

  // sort by - player, position played, percentage rating, match, author, created at

  return (
    <>
      <StyledTableRow
        hover
        key={id}
        onClick={isMenuOpen ? undefined : () => router.push(`/notes/${id}`)}
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
        {player ? (
          <CellWithLink
            href={`/players/${player.slug}`}
            label={`${player.firstName} ${player.lastName}`}
          />
        ) : (
          <StyledTableCell>-</StyledTableCell>
        )}
        <StyledTableCell>position (TODO)</StyledTableCell>
        <StyledTableCell>{percentageRating}%</StyledTableCell>
        {match ? (
          <CellWithLink
            href={`/matches/${match.id}`}
            label={getDisplayName(match.homeTeam, match.awayTeam)}
          />
        ) : (
          <StyledTableCell>-</StyledTableCell>
        )}

        <StyledTableCell>
          {match ? formatDate(match.date) : '-'}
        </StyledTableCell>
        <StyledTableCell>{`${author.firstName} ${author.lastName}`}</StyledTableCell>
        <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
                {`Nr ${shirtNo || 'N/A'}, ${
                  player ? 'TODO: Position' : 'N/A'
                } (${'TODO: klub' ? 'TODO: klub' : 'N/A'})`}
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
