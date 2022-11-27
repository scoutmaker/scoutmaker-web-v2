import { IStandardComboOptions } from '@/components/combo/types'

import { IPlayerComboOptions } from '../players/types'

export type FindAllTeamAffiliationsParams = Pick<
  Paths.TeamAffiliationsControllerFindAll.QueryParameters,
  'limit' | 'page' | 'playerId' | 'sortBy' | 'sortingOrder' | 'teamId'
>

export type TeamAffiliationsFilterDto = Pick<
  FindAllTeamAffiliationsParams,
  'playerId' | 'teamId'
>

export type TeamAffiliationsFiltersState = Omit<
  TeamAffiliationsFilterDto,
  'playerId' | 'teamId'
> & {
  playerId: IPlayerComboOptions | null
  teamId: IStandardComboOptions | null
}

export type TeamAffiliationsSortBy =
  Paths.TeamAffiliationsControllerFindAll.Parameters.SortBy

export type TeamAffiliationDto = Components.Schemas.TeamAffiliationDto

export type CreateTeamAffiliationDto =
  Components.Schemas.CreateTeamAffiliationDto

export type UpdateTeamAffiliationDto =
  Components.Schemas.UpdateTeamAffiliationDto
