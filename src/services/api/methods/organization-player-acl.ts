import {
  CreateOrganizationPlayerAclDto,
  FindAllOrganizationPlayerAclsParams,
  OrganizationPlayerAclDto,
  UpdateOrganizationPlayerAclDto,
} from '@/modules/organization-player-acl/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'organization-player-acl'

export const getOrganizationPlayerAcls = (
  params: FindAllOrganizationPlayerAclsParams,
) =>
  getPaginatedData<
    FindAllOrganizationPlayerAclsParams,
    OrganizationPlayerAclDto
  >(params, moduleName)

export const deleteOrganizationPlayerAcl = (id: string) =>
  deleteDocument<OrganizationPlayerAclDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateOrganizationPlayerAclDto
}
export const updateOrganizationPlayerAcl = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateOrganizationPlayerAclDto, OrganizationPlayerAclDto>(
    id,
    data,
    moduleName,
  )

export const createOrganizationPlayerAcl = (
  data: CreateOrganizationPlayerAclDto,
) =>
  createDocument<CreateOrganizationPlayerAclDto, OrganizationPlayerAclDto>(
    data,
    moduleName,
  )

export const getOrganizationPlayerAclById = (id: string, token?: string) =>
  getAssetById<OrganizationPlayerAclDto>({ moduleName, id, token })
