import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { getCompetitionsList } from '@/services/api/methods/competitions'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'

const moduleName: TModuleName = 'competitions'

export const useCompetitionsList = () =>
  useList<CompetitionBasicDataDto>(moduleName, getCompetitionsList)
