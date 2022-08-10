export type CompetitionBasicDataDto = Components.Schemas.CompetitionBasicDataDto
export type CompetitionParticipationWithoutTeamDto =
  Components.Schemas.CompetitionParticipationWithoutTeamDto

export type CompetitionDto = Components.Schemas.CompetitionDto

export type CreateCompetitonDto = Components.Schemas.CreateCompetitionDto

export type UpdateCompetitionDto = Components.Schemas.UpdateCompetitionDto

export type FindAllCompetitionsParams = Pick<
  Paths.CompetitionsControllerFindAll.QueryParameters,
  | 'ageCategoryId'
  | 'countryId'
  | 'gender'
  | 'juniorLevelId'
  | 'level'
  | 'limit'
  | 'name'
  | 'page'
  | 'sortBy'
  | 'sortingOrder'
  | 'typeId'
>

export type CompetitionsFiltersDto = Pick<
  FindAllCompetitionsParams,
  | 'ageCategoryId'
  | 'countryId'
  | 'gender'
  | 'juniorLevelId'
  | 'level'
  | 'name'
  | 'typeId'
>

export type CompetitionsSortBy =
  Paths.CompetitionsControllerFindAll.Parameters.SortBy
