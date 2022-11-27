import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { getSingleTeamRoute } from '@/modules/teams/utils'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { CompetitionParticipationDto } from '../types'

interface ICompetitionParticipationsTableRowProps {
  data: CompetitionParticipationDto
  shouldDisplayTeamName?: boolean
  onEditClick?: () => void
  onDeleteClick?: () => void
  actions?: boolean
}

export const CompetitionParticipationsTableRow = ({
  data,
  shouldDisplayTeamName,
  onEditClick,
  onDeleteClick,
  actions,
}: ICompetitionParticipationsTableRowProps) => {
  const { competition, group, season, team, id } = data
  const router = useRouter()

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
      onClick={
        isMenuOpen
          ? undefined
          : () => router.push(`/competition-participations/${id}`)
      }
    >
      {actions && (
        <StyledTableCell padding="checkbox">
          <TableMenu
            menuAnchorEl={menuAnchorEl}
            isMenuOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            onDeleteClick={
              onDeleteClick ? () => handleMenuAction(onDeleteClick) : undefined
            }
            onEditClick={
              onEditClick ? () => handleMenuAction(onEditClick) : undefined
            }
          />
        </StyledTableCell>
      )}
      {shouldDisplayTeamName ? (
        <CellWithLink href={getSingleTeamRoute(team.slug)} label={team.name} />
      ) : null}
      <CellWithLink href={`/seasons/${season.id}`} label={season.name} />
      <CellWithLink
        href={`/competitions/${competition.id}`}
        label={competition.name}
      />
      {group ? (
        <CellWithLink
          href={`/competition-groups/${group.id}`}
          label={group.name}
        />
      ) : (
        <StyledTableCell>-</StyledTableCell>
      )}
    </StyledTableRow>
  )
}
