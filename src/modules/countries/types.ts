export type CountryDto = Components.Schemas.CountryDto

export type CountriesFiltersDto = Pick<Paths.CountriesControllerFindAll.QueryParameters, 'isEuMember'>