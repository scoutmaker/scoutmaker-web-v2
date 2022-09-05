import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { getSingleTeamRoute } from '@/modules/teams/utils'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { CompetitionParticipationDto } from '../types'

interface ICompetitionParticipationsTableRowProps {
  data: CompetitionParticipationDto
  shouldDisplayTeamName?: boolean
  onEditClick: () => void
  onDeleteClick: () => void
  isEditOptionEnabled: boolean
  isDeleteOptionEnabled: boolean
  actions?: boolean
}

export const CompetitionParticipationsTableRow = ({
  data,
  shouldDisplayTeamName,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
  actions
}: ICompetitionParticipationsTableRowProps) => {
  const { competition, group, season, team } = data
  const router = useRouter()
  const { t } = useTranslation()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  return (
    <StyledTableRow
      hover
      key={`${competition.id}${season.id}${team.id}`}
      onClick={isMenuOpen ? undefined : () => router.push(`/competition-participations/${team.id}/${competition.id}/${season.id}`)}
    >
      {actions &&
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
          </TableMenu>
        </StyledTableCell>}
      {shouldDisplayTeamName ? (
        <CellWithLink href={getSingleTeamRoute(team.slug)} label={team.name} />
      ) : null}
      <CellWithLink href={`/seasons/${season.id}`} label={season.name} />
      <CellWithLink href={`/competitions/${competition.id}`} label={competition.name} />
      {group ? <CellWithLink href={`/competition-groups/${group.id}`} label={group.name} /> : <StyledTableCell>-</StyledTableCell>}
    </StyledTableRow>
  )
}