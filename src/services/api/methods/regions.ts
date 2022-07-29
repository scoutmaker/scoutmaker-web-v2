import { RegionDto } from '@/modules/regions/types'
import { getDataList } from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'regions'

export const getRegionsList = () => getDataList<RegionDto>(moduleName)
