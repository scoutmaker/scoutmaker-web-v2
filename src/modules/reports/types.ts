import { IComboOptions, IStandardComboOptions } from '@/components/combo/types'
import { IPlayerPositionTypeComboOptions } from '@/modules/player-position-types/types'

import { ICompetitionGroupComboOptions } from '../competition-groups/types'
import { ICompetitionComboOptions } from '../competitions/types'
import { IMatchComboOptions } from '../matches/types'
import { IPlayerPositionComboOptions } from '../player-positions/types'
import { IPlayerComboOptions, PlayerSuperBasicDataDto } from '../players/types'
import { UserBasicDataDto } from '../users/types'

export type ReportBasicDataDto = Components.Schemas.ReportBasicDataDto

export type FindAllReportsParams = Pick<
  Paths.ReportsControllerFindAll.QueryParameters,
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
  | 'positionTypeIds'
  | 'sortBy'
  | 'sortingOrder'
  | 'teamIds'
  | 'hasVideo'
  | 'userId'
  | 'observationType'
  | 'onlyLikedPlayers'
  | 'onlyLikedTeams'
  | 'percentageRatingRanges'
  | 'onlyMine'
>

export type ReportsFiltersDto = Omit<
  FindAllReportsParams,
  'limit' | 'page' | 'sortBy' | 'sortingOrder'
>

export type ReportsFiltersState = Omit<
  ReportsFiltersDto,
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'matchIds'
  | 'playerIds'
  | 'positionIds'
  | 'teamIds'
  | 'observationType'
  | 'percentageRatingRanges'
  | 'playerBornAfter'
  | 'playerBornBefore'
  | 'positionTypeIds'
> & {
  competitionGroupIds: ICompetitionGroupComboOptions[]
  competitionIds: ICompetitionComboOptions[]
  matchIds: IMatchComboOptions[]
  playerIds: IPlayerComboOptions[]
  positionIds: IPlayerPositionComboOptions[]
  positionTypeIds: IPlayerPositionTypeComboOptions[]
  teamIds: IStandardComboOptions[]
  observationType: IComboOptions | null
  percentageRatingRanges: IComboOptions[]
  playerBornAfter: '' | number
  playerBornBefore: '' | number
}

export type ReportsSortBy = Paths.ReportsControllerFindAll.Parameters.SortBy

export type ReportDto = Components.Schemas.ReportDto

export type ReportPaginatedDataDto = Components.Schemas.ReportPaginatedDataDto

export type CreateReportDto = Components.Schemas.CreateReportDto

export type UpdateReportDto = Components.Schemas.UpdateReportDto

export type ReportStatus = ReportDto['status']

export type ReportType = 'order' | 'custom'

export interface IReportsComboOptions extends IComboOptions {
  status: 'IN_PROGRESS' | 'FINISHED'
  docNumber: number
  player: PlayerSuperBasicDataDto
  author: UserBasicDataDto
}

export type IReportFromNoteQuery = Pick<
  CreateReportDto,
  'playerId' | 'matchId' | 'shirtNo' | 'finalRating' | 'summary'
>
