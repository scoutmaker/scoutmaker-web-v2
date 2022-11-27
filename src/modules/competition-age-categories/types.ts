export type CompetitionAgeCategortyDto =
  Components.Schemas.CompetitionAgeCategoryDto

export type CreateCompetitionAgeCategoryDto =
  Components.Schemas.CreateCompetitionAgeCategoryDto

export type UpdateCompetitionAgeCategoryDto =
  Components.Schemas.UpdateCompetitionAgeCategoryDto

export type FindAllCompetitionAgeCategoriesParams = Pick<
  Paths.CompetitionAgeCategoriesControllerFindAll.QueryParameters,
  'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type CompetitionAgeCategoriesFiltersDto = Pick<
  Paths.CompetitionAgeCategoriesControllerFindAll.QueryParameters,
  'name'
>

export type CompetitionAgeCategoriesSortBy =
  Paths.CompetitionAgeCategoriesControllerFindAll.Parameters.SortBy
