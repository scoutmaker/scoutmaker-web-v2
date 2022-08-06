import {
  CreateRegionDto,
  FindAllRegionsParams,
  RegionDto,
  UpdateRegionDto,
} from '@/modules/regions/types'
import {
  createDocument,
  deleteDocument,
  getDataList,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'regions'

export const getRegionsList = () => getDataList<RegionDto>(moduleName)

export const getRegions = (params: FindAllRegionsParams) =>
  getPaginatedData<FindAllRegionsParams, RegionDto>(params, moduleName)

interface IUpdateRegionArgs {
  id: number
  data: UpdateRegionDto
}

export const updateRegion = ({ id, data }: IUpdateRegionArgs) =>
  updateDocument<UpdateRegionDto, RegionDto>(id, data, moduleName)

export const deleteRegion = (id: number) =>
  deleteDocument<RegionDto>(id, moduleName)

export const createRegion = (data: CreateRegionDto) =>
  createDocument<CreateRegionDto, RegionDto>(data, moduleName)
