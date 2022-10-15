import { IComboOptions } from '@/components/combo/types'

export type RegionDto = Components.Schemas.RegionDto
export type CreateRegionDto = Components.Schemas.CreateRegionDto
export type UpdateRegionDto = Components.Schemas.UpdateRegionDto
export type RegionsFilterDto = Pick<
  Paths.RegionsControllerFindAll.QueryParameters,
  'name' | 'countryId'
>

export type RegionsFiltersState = Omit<RegionsFilterDto, 'countryId'> & {
  countryId: IComboOptions | null
}

export type FindAllRegionsParams = Pick<
  Paths.RegionsControllerFindAll.QueryParameters,
  'countryId' | 'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>
export type RegionsSortBy = Paths.RegionsControllerFindAll.Parameters.SortBy
