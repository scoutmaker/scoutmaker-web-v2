import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { getCompetitionGroupsList } from '@/services/api/methods/competition-groups'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'

const moduleName: TModuleName = 'competition-groups'

export const useCompetitionGroupsList = () =>
  useList<CompetitionGroupBasicDataDto>(moduleName, getCompetitionGroupsList)
