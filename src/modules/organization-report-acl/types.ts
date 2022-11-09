import { IStandardComboOptions } from '@/components/combo/types'

import { IReportsComboOptions } from '../reports/types'

export type OrganizationReportAclDto =
  Components.Schemas.OrganizationReportAceDto

export interface CreateOrganizationReportAclDto
  extends Omit<
    Components.Schemas.CreateOrganizationReportAceDto,
    'permissionLevel'
  > {
  permissionLevel:
    | Components.Schemas.CreateOrganizationReportAceDto['permissionLevel']
    | ''
}

export type UpdateOrganizationReportAclDto =
  Components.Schemas.UpdateOrganizationReportAceDto

export type FindAllOrganizationReportAclParams = Pick<
  Paths.OrganizationReportAclControllerFindAll.QueryParameters,
  'limit' | 'organizationId' | 'page' | 'reportId' | 'sortBy' | 'sortingOrder'
>

export type OrganizationReportAclFiltersDto = Pick<
  FindAllOrganizationReportAclParams,
  'organizationId' | 'reportId'
>

export type OrganizationReportAclFiltersState = Omit<
  OrganizationReportAclFiltersDto,
  'organizationId' | 'reportId'
> & {
  organizationId: IStandardComboOptions | null
  reportId: IReportsComboOptions | null
}

export type OrganizationReportAclSortBy =
  Paths.OrganizationReportAclControllerFindAll.Parameters.SortBy
