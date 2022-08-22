export type CompetitionJuniorLevelDto =
  Components.Schemas.CompetitionJuniorLevelDto

export type FindAllCompetitionJuniorLevelsParams = Pick<
  Paths.CompetitionJuniorLevelsControllerFindAll.QueryParameters,
  'level' | 'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>
