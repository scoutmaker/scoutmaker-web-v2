export type CompetitionJuniorLevelDto =
  Components.Schemas.CompetitionJuniorLevelDto

export type FindAllCompetitionJuniorLevelsParams = Pick<
  Paths.CompetitionJuniorLevelsControllerFindAll.QueryParameters,
  'level' | 'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type CreateCompetitionJuniorLevelDto =
  Components.Schemas.CreateCompetitionJuniorLevelDto

export type UpdateCompetitionJuniorLevelDto =
  Components.Schemas.UpdateCompetitionJuniorLevelDto

export type CompetitionJuniorLevelsFiltersDto = Pick<
  FindAllCompetitionJuniorLevelsParams,
  'level' | 'name'
>

export type CompetitionJuniorLevelsSortBy =
  Paths.CompetitionJuniorLevelsControllerFindAll.Parameters.SortBy
