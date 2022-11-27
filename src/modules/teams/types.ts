import { IStandardComboOptions } from '@/components/combo/types'

import { ICompetitionGroupComboOptions } from '../competition-groups/types'
import { ICompetitionComboOptions } from '../competitions/types'
import { ICountryComboOptions } from '../countries/types'

export type TeamBasicDataDto = Components.Schemas.TeamBasicDataDto
export type FindAllTeamsParams = Pick<
  Paths.TeamsControllerFindAll.QueryParameters,
  | 'clubId'
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'countryIds'
  | 'isLiked'
  | 'limit'
  | 'name'
  | 'page'
  | 'regionIds'
  | 'sortBy'
  | 'sortingOrder'
>
export type TeamsFiltersDto = Pick<
  FindAllTeamsParams,
  | 'clubId'
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'countryIds'
  | 'isLiked'
  | 'name'
  | 'regionIds'
>

export type TeamsFiltersState = Omit<
  TeamsFiltersDto,
  | 'clubId'
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'countryIds'
  | 'regionIds'
> & {
  clubId: IStandardComboOptions | null
  competitionGroupIds: ICompetitionGroupComboOptions[]
  competitionIds: ICompetitionComboOptions[]
  countryIds: ICountryComboOptions[]
  regionIds: IStandardComboOptions[]
}

export type TeamsSortBy = Paths.TeamsControllerFindAll.Parameters.SortBy
export type TeamDto = Components.Schemas.TeamDto
export type CreateTeamDto = Components.Schemas.CreateTeamDto
export type UpdateTeamDto = Components.Schemas.UpdateTeamDto
