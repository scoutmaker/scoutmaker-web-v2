import {
  CreateRegionDto,
  FindAllRegionsParams,
  RegionDto,
  UpdateRegionDto,
} from '@/modules/regions/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
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
  id: string
  data: UpdateRegionDto
}

export const updateRegion = ({ id, data }: IUpdateRegionArgs) =>
  updateDocument<UpdateRegionDto, RegionDto>(id, data, moduleName)

export const deleteRegion = (id: string) =>
  deleteDocument<RegionDto>(id, moduleName)

export const createRegion = (data: CreateRegionDto) =>
  createDocument<CreateRegionDto, RegionDto>(data, moduleName)

export const getRegionById = (id: string, token?: string) =>
  getAssetById<RegionDto>({ moduleName, id, token })
