export type NoteBasicDataDto = Components.Schemas.NoteBasicDataDto

export type FindAllNotesParams = Pick<
  Paths.NotesControllerFindAll.QueryParameters,
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'isLiked'
  | 'limit'
  | 'matchIds'
  | 'page'
  | 'percentageRatingRangeEnd'
  | 'percentageRatingRangeStart'
  | 'playerBornAfter'
  | 'playerBornBefore'
  | 'playerIds'
  | 'positionIds'
  | 'sortBy'
  | 'sortingOrder'
  | 'teamIds'
>

export type NotesFiltersDto = Omit<
  FindAllNotesParams,
  'limit' | 'page' | 'sortBy' | 'sortingOrder'
>

export type NotesSortBy = Paths.NotesControllerFindAll.Parameters.SortBy

export type NoteDto = Components.Schemas.NoteDto

export type CreateNoteDto = Components.Schemas.CreateNoteDto

export type UpdateNoteDto = Components.Schemas.UpdateNoteDto
