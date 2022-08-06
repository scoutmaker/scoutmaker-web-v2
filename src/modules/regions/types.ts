export type RegionDto = Components.Schemas.RegionDto
export type CreateRegionDto = Components.Schemas.CreateRegionDto
export type UpdateRegionDto = Components.Schemas.UpdateRegionDto
export type RegionsFilterDto = Pick<
  Paths.RegionsControllerFindAll.QueryParameters,
  'name' | 'countryId'
>
