import {
  CompetitionJuniorLevelDto,
  FindAllCompetitionJuniorLevelsParams,
} from '@/modules/competition-junior-levels/types'

import { TModuleName } from '../modules'
import { getPaginatedData } from './helpers'

const moduleName: TModuleName = 'competition-junior-levels'

export const getCompetitionJuniorLevels = (
  params: FindAllCompetitionJuniorLevelsParams,
) =>
  getPaginatedData<
    FindAllCompetitionJuniorLevelsParams,
    CompetitionJuniorLevelDto
  >(params, moduleName)
