export type CountryDto = Components.Schemas.CountryDto

export type CountriesFiltersDto = Pick<Paths.CountriesControllerFindAll.QueryParameters, 'isEuMember'>

export type CreateCountryDto = Components.Schemas.CreateCountryDto
export type UpdateCountryDto = Components.Schemas.UpdateCountryDto
