import { IComboOptions, IStandardComboOptions } from '@/components/combo/types'
import { IPlayerPositionTypeComboOptions } from '@/modules/player-position-types/types'

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
  | 'positionTypeIds'
  | 'teamIds'
  | 'orderId'
  | 'hasNote'
  | 'hasReport'
  | 'hasAnyObservation'
  | 'maxAverageRating'
  | 'minAverageRating'
  | 'grades'
  | 'recentAverageRating'
>

export type PlayersFiltersState = Omit<
  PlayersFiltersDto,
  | 'countryIds'
  | 'positionIds'
  | 'positionTypeIds'
  | 'teamIds'
  | 'competitionIds'
  | 'competitionGroupIds'
  | 'footed'
  | 'bornAfter'
  | 'bornBefore'
  | 'maxAverageRating'
  | 'minAverageRating'
  | 'grades'
  | 'recentAverageRating'
> & {
  countryIds: ICountryComboOptions[]
  positionIds: IPlayerPositionComboOptions[]
  positionTypeIds: IPlayerPositionTypeComboOptions[]
  teamIds: IStandardComboOptions[]
  competitionIds: ICompetitionComboOptions[]
  competitionGroupIds: ICompetitionGroupComboOptions[]
  footed: IComboOptions | null
  bornAfter: '' | number
  bornBefore: '' | number
  maxAverageRating: '' | number
  minAverageRating: '' | number
  grades: IComboOptions[]
  recentAverageRating: IComboOptions | null
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
