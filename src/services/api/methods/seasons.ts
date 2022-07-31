import { SeasonDto } from '@/modules/seasons/types'
import { getDataList } from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'seasons'

export const getSeasonsList = () => getDataList<SeasonDto>(moduleName)
