import { Link as MUILink } from '@mui/material'
import Link from 'next/link'

import { StyledTableCell } from '@/components/tables/common/cell'
import { StyledTableRow } from '@/components/tables/common/row'
import { TeamAffiliationDto } from '@/modules/team-affiliations.ts/types'
import { formatDate } from '@/utils/format-date'

interface ITeamAffiliationsTableRowProps {
  data: TeamAffiliationDto
  shouldDisplayPlayerName?: boolean
}

export const TeamAffiliationsTableRow = ({
  data,
  shouldDisplayPlayerName,
}: ITeamAffiliationsTableRowProps) => {
  const { id, player, team, startDate, endDate } = data

  return (
    <StyledTableRow key={id}>
      {shouldDisplayPlayerName ? (
        <StyledTableCell sx={{ minWidth: 150 }}>
          <Link href={`/players/${player.slug}`} passHref>
            <MUILink onClick={e => e.stopPropagation()}>
              {`${player.firstName} ${player.lastName}`}
            </MUILink>
          </Link>
        </StyledTableCell>
      ) : null}
      <StyledTableCell sx={{ minWidth: 150 }}>
        <Link href={`/teams/${team.slug}`} passHref>
          <MUILink onClick={e => e.stopPropagation()}>{team.name}</MUILink>
        </Link>
      </StyledTableCell>
      <StyledTableCell>{formatDate(startDate)}</StyledTableCell>
      <StyledTableCell>{endDate ? formatDate(endDate) : '-'}</StyledTableCell>
    </StyledTableRow>
  )
}
