import { IComboOptions } from '@/components/combo/types'

export type FindAllCompetitionParticipationsParams = Pick<
  Paths.CompetitionParticipationsControllerFindAll.QueryParameters,
  | 'competitionId'
  | 'groupId'
  | 'limit'
  | 'page'
  | 'seasonId'
  | 'sortBy'
  | 'sortingOrder'
  | 'teamId'
>
export type CompetitionParticipationsFilterDto = Pick<
  FindAllCompetitionParticipationsParams,
  'competitionId' | 'groupId' | 'seasonId' | 'teamId'
>

export type CompetitionParticipationsFiltersState = Omit<
  CompetitionParticipationsFilterDto,
  'competitionId' | 'groupId' | 'seasonId' | 'teamId'
> & {
  competitionId: IComboOptions | null
  groupId: IComboOptions | null
  seasonId: IComboOptions | null
  teamId: IComboOptions | null
}

export type CompetitionParticipationsSortBy =
  Paths.CompetitionParticipationsControllerFindAll.Parameters.SortBy
export type CompetitionParticipationDto =
  Components.Schemas.CompetitionParticipationDto
export type CreateCompetitionParticipationDto =
  Components.Schemas.CreateCompetitionParticipationDto
export type UpdateCompetitionParticipationDto =
  Components.Schemas.UpdateCompetitionParticipationDto

export type CopyCompetitionParticipationsDto =
  Paths.CompetitionParticipationsControllerCopyFromSeasonToSeason.PathParameters
