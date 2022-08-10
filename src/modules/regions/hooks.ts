import {
  CreateRegionDto,
  FindAllRegionsParams,
  RegionDto,
  UpdateRegionDto,
} from '@/modules/regions/types'
import {
  createRegion,
  deleteRegion,
  getRegions,
  getRegionsList,
  updateRegion,
} from '@/services/api/methods/regions'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'regions'

export const useRegionsList = () =>
  useList<RegionDto>(moduleName, getRegionsList)

export const useRegions = (params: FindAllRegionsParams) =>
  usePaginatedData<FindAllRegionsParams, RegionDto>(
    moduleName,
    params,
    getRegions,
  )

export const useUpdateRegion = (id: number) =>
  useUpdateDocument<UpdateRegionDto, RegionDto>(moduleName, id, updateRegion)

export const useDeleteRegion = () =>
  useDeleteDocument<RegionDto>(moduleName, deleteRegion)

export const useCreateRegion = () =>
  useCreateDocument<CreateRegionDto, RegionDto>(moduleName, createRegion)
