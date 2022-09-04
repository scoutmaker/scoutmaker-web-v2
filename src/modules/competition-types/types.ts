export type CompetitionTypeDto = Components.Schemas.CompetitionTypeDto

export type CompetitionTypesFindAllParams = Pick<
  Paths.CompetitionTypesControllerFindAll.QueryParameters,
  'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type CreateCompetitionTypeDto =
  Components.Schemas.CreateCompetitionTypeDto

export type UpdateCompetitionTypeDto =
  Components.Schemas.UpdateCompetitionTypeDto

export type CompetitionTypesFiltersDto = Pick<
  CompetitionTypesFindAllParams,
  'name'
>

export type CompetitionTypesSortBy =
  Paths.CompetitionTypesControllerFindAll.Parameters.SortBy
