import { IReportsComboOptions } from '../reports/types'
import { IUsersComboOptions } from '../users/types'

export type UserReportAclDto = Components.Schemas.UserReportAceDto

export interface CreateUserReportAclDto
  extends Omit<Components.Schemas.CreateUserReportAceDto, 'permissionLevel'> {
  permissionLevel:
    | Components.Schemas.CreateUserReportAceDto['permissionLevel']
    | ''
}

export type UpdateUserReportAclDto = Components.Schemas.UpdateUserReportAceDto

export type FindAllUserReportAclParams = Pick<
  Paths.UserReportAclControllerFindAll.QueryParameters,
  'limit' | 'page' | 'sortBy' | 'sortingOrder' | 'reportId' | 'userId'
>

export type UserReportAclFiltersDto = Pick<
  FindAllUserReportAclParams,
  'reportId' | 'userId'
>

export type UserReportAclFiltersState = Omit<
  UserReportAclFiltersDto,
  'reportId' | 'userId'
> & {
  reportId: IReportsComboOptions | null
  userId: IUsersComboOptions | null
}

export type UserReportAclSortBy =
  Paths.UserReportAclControllerFindAll.Parameters.SortBy
