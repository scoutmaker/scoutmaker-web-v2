import { SeasonDto } from '@/modules/seasons/types'
import { getSeasonsList } from '@/services/api/methods/seasons'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'

const moduleName: TModuleName = 'seasons'

export const useSeasonsList = () =>
  useList<SeasonDto>(moduleName, getSeasonsList)
