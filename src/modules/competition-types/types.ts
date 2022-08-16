export type CompetitionTypeDto = Components.Schemas.CompetitionTypeDto

export type CompetitionTypesFindAllParams = Pick<
  Paths.CompetitionTypesControllerFindAll.QueryParameters,
  'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>
