export type FindAllCompetitionParticipationsParams =
  Paths.CompetitionParticipationsControllerFindAll.QueryParameters
export type TeamsFiltersDto = Pick<
  FindAllCompetitionParticipationsParams,
  'competitionId' | 'groupId' | 'seasonId' | 'teamId'
>
export type CompetitionParticipationsSortBy =
  Paths.CompetitionParticipationsControllerFindAll.Parameters.SortBy
export type CompetitionParticipationDto =
  Components.Schemas.CompetitionParticipationDto
export type CreateCompetitionParticipationDto =
  Components.Schemas.CreateCompetitionParticipationDto
export type UpdateCompetitionParticipationDto =
  Components.Schemas.UpdateCompetitionParticipationDto
