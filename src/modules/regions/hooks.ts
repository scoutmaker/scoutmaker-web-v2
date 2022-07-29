import { RegionDto } from '@/modules/regions/types'
import { getRegionsList } from '@/services/api/methods/regions'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'

const moduleName: TModuleName = 'regions'

export const useRegionsList = () =>
  useList<RegionDto>(moduleName, getRegionsList)
