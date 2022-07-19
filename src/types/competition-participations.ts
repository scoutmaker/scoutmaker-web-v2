export type FindAllCompetitionParticipationsParams =
  Paths.CompetitionParticipationsControllerFindAll.QueryParameters
export type CompetitionParticipationsFilterDto = Pick<
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
