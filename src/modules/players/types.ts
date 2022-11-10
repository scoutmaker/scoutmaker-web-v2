import { IComboOptions, IStandardComboOptions } from '@/components/combo/types'

import { ICompetitionGroupComboOptions } from '../competition-groups/types'
import { ICompetitionComboOptions } from '../competitions/types'
import { ICountryComboOptions } from '../countries/types'
import { IPlayerPositionComboOptions } from '../player-positions/types'

export type PlayerBasicDataDto = Components.Schemas.PlayerBasicDataDto
export type PlayerSuperBasicDataDto = Components.Schemas.PlayerSuperBasicDataDto

export type FindAllPlayersParams = Omit<
  Paths.PlayersControllerFindAll.QueryParameters,
  'footed'
> & { footed?: Footed | '' }

export type Footed = Paths.PlayersControllerFindAll.Parameters.Footed

export type PlayersFiltersDto = Pick<
  FindAllPlayersParams,
  | 'bornAfter'
  | 'bornBefore'
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'countryIds'
  | 'isLiked'
  | 'footed'
  | 'name'
  | 'positionIds'
  | 'teamIds'
  | 'orderId'
  | 'hasNote'
  | 'hasReport'
>

export type PlayersFiltersState = Omit<
  PlayersFiltersDto,
  | 'countryIds'
  | 'positionIds'
  | 'teamIds'
  | 'competitionIds'
  | 'competitionGroupIds'
  | 'footed'
> & {
  countryIds: ICountryComboOptions[]
  positionIds: IPlayerPositionComboOptions[]
  teamIds: IStandardComboOptions[]
  competitionIds: ICompetitionComboOptions[]
  competitionGroupIds: ICompetitionGroupComboOptions[]
  footed: IComboOptions | null
}

export type PlayersSortBy = Paths.PlayersControllerFindAll.Parameters.SortBy

export type PlayerDto = Omit<Components.Schemas.PlayerDto, '_count'> & {
  _count: { reports: number; notes: number }
}

export type CreatePlayerDto = Components.Schemas.CreatePlayerDto

export type UpdatePlayerDto = Components.Schemas.UpdatePlayerDto

export interface IPlayerComboOptions extends IComboOptions {
  firstName: string
  lastName: string
}
