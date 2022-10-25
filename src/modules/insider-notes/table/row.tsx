import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { LikeIcon, UnlikeIcon } from '@/components/icons'
import { LikedTableCell } from '@/components/likedTableCell/likedTableCell'
import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { getSinglePlayerRoute } from '@/modules/players/utils'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { InsiderNoteDto } from '../types'

interface ITableRowProps {
  data: InsiderNoteDto
  onEditClick: () => void
  onDeleteClick: () => void
  onUnlikeClick: (id: string) => void
  onLikeClick: (id: string) => void
}

export const InsiderNotesTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  onUnlikeClick,
  onLikeClick,
}: ITableRowProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { player, createdAt, informant, id, likes, meta } = data

  const cellChangeLikedClick = () => {
    if (likes.length) onUnlikeClick(id)
    else onLikeClick(id)
  }

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen ? undefined : () => router.push(`/insider-notes/${id}`)
      }
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
          {likes.length ? (
            <TableMenuItem
              icon={<UnlikeIcon fontSize="small" />}
              text={t('REMOVE_FROM_LIKED')}
              onClick={() => {
                handleMenuAction(() => onUnlikeClick(id))
              }}
            />
          ) : (
            <TableMenuItem
              icon={<LikeIcon fontSize="small" />}
              text={t('ADD_TO_LIKED')}
              onClick={() => {
                handleMenuAction(() => onLikeClick(id))
              }}
            />
          )}
        </TableMenu>
      </StyledTableCell>
      <LikedTableCell
        isLiked={!!likes.length}
        onClicked={cellChangeLikedClick}
      />
      <CellWithLink
        href={getSinglePlayerRoute(player.slug || '')}
        label={`${player.firstName} ${player.lastName}`}
      />
      <StyledTableCell> {player.primaryPosition.name}</StyledTableCell>
      <CellWithLink
        href={`/teams/${meta?.team?.slug}`}
        label={meta?.team ? meta.team.name : ''}
      />
      <StyledTableCell>{informant || ''}</StyledTableCell>
      <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
    </StyledTableRow>
  )
}
