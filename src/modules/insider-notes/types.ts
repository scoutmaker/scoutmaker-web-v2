import { IComboOptions } from '@/components/combo/types'

export type InsiderNoteDto = Components.Schemas.InsiderNoteDto

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
  competitionGroupIds: IComboOptions[]
  competitionIds: IComboOptions[]
  playerIds: IComboOptions[]
  positionIds: IComboOptions[]
  teamIds: IComboOptions[]
}

export type InsiderNotesSortBy =
  Paths.InsiderNotesControllerFindAll.Parameters.SortBy
