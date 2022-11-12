import {
  CreateOrganizationReportAclDto,
  FindAllOrganizationReportAclParams,
  OrganizationReportAclDto,
  UpdateOrganizationReportAclDto,
} from '@/modules/organization-report-acl/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'organization-report-acl'

export const getOrganizationReportAcls = (
  params: FindAllOrganizationReportAclParams,
) =>
  getPaginatedData<
    FindAllOrganizationReportAclParams,
    OrganizationReportAclDto
  >(params, moduleName)

export const deleteOrganizationReportAcl = (id: string) =>
  deleteDocument<OrganizationReportAclDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateOrganizationReportAclDto
}
export const updateOrganizationReportAcl = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateOrganizationReportAclDto, OrganizationReportAclDto>(
    id,
    data,
    moduleName,
  )

export const createOrganizationReportAcl = (
  data: CreateOrganizationReportAclDto,
) =>
  createDocument<CreateOrganizationReportAclDto, OrganizationReportAclDto>(
    data,
    moduleName,
  )

export const getOrganizationReportAclById = (id: string, token?: string) =>
  getAssetById<OrganizationReportAclDto>({ moduleName, id, token })
