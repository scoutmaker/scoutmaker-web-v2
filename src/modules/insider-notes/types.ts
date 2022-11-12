import { IComboOptions, IStandardComboOptions } from '@/components/combo/types'
import { ICompetitionGroupComboOptions } from '../competition-groups/types'
import { ICompetitionComboOptions } from '../competitions/types'
import { IPlayerPositionComboOptions } from '../player-positions/types'
import { IPlayerComboOptions } from '../players/types'
import { UserBasicDataDto } from '../users/types'

export type InsiderNoteDto = Components.Schemas.InsiderNoteDto
export type InsiderNoteBasicDataDto = Components.Schemas.InsiderNoteBasicDataDto

export type CreateInsiderNoteDto = Components.Schemas.CreateInsiderNoteDto

export type UpdateInsiderNoteDto = Components.Schemas.UpdateInsiderNoteDto

export type FindAllInsiderNotesParams = Pick<
  Paths.InsiderNotesControllerFindAll.QueryParameters,
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'isLiked'
  | 'limit'
  | 'page'
  | 'playerIds'
  | 'positionIds'
  | 'sortBy'
  | 'sortingOrder'
  | 'teamIds'
>

export type InsiderNotesFiltersDto = Pick<
  FindAllInsiderNotesParams,
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'isLiked'
  | 'playerIds'
  | 'positionIds'
  | 'teamIds'
>

export type InsiderNotesFiltersState = Omit<
  InsiderNotesFiltersDto,
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'playerIds'
  | 'positionIds'
  | 'teamIds'
> & {
  competitionGroupIds: ICompetitionGroupComboOptions[]
  competitionIds: ICompetitionComboOptions[]
  playerIds: IPlayerComboOptions[]
  positionIds: IPlayerPositionComboOptions[]
  teamIds: IStandardComboOptions[]
}

export type InsiderNotesSortBy =
  Paths.InsiderNotesControllerFindAll.Parameters.SortBy

export interface IInsiderNoteComboOptions extends IComboOptions {
  docNumber: number
  player: Components.Schemas.PlayerBasicDataWithoutTeamsDto
  author: UserBasicDataDto
}
