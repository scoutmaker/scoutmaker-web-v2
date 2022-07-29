import { StyledTableCell } from '@/components/tables/cell'
import { StyledTableRow } from '@/components/tables/row'

import { CompetitionParticipationDto } from '../types'

interface ICompetitionParticipationsTableRowProps {
  data: CompetitionParticipationDto
  shouldDisplayTeamName?: boolean
}

export const CompetitionParticipationsTableRow = ({
  data,
  shouldDisplayTeamName,
}: ICompetitionParticipationsTableRowProps) => {
  const { competition, group, season, team } = data

  return (
    <StyledTableRow key={`${competition.id}${season.id}${team.id}`}>
      {shouldDisplayTeamName ? (
        <StyledTableCell>{team.name}</StyledTableCell>
      ) : null}
      <StyledTableCell>{season.name}</StyledTableCell>
      <StyledTableCell>{competition.name}</StyledTableCell>
      <StyledTableCell>{group?.name}</StyledTableCell>
    </StyledTableRow>
  )
}
