import {
  CreateOrganizationNoteAclDto,
  FindAllOrganizationNoteAclsParams,
  OrganizationNoteAclDto,
  UpdateOrganizationNoteAclDto,
} from '@/modules/organization-note-acl/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'organization-note-acl'

export const getOrganizationNoteAcls = (
  params: FindAllOrganizationNoteAclsParams,
) =>
  getPaginatedData<FindAllOrganizationNoteAclsParams, OrganizationNoteAclDto>(
    params,
    moduleName,
  )

export const deleteOrganizationNoteAcl = (id: string) =>
  deleteDocument<OrganizationNoteAclDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateOrganizationNoteAclDto
}
export const updateOrganizationNoteAcl = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateOrganizationNoteAclDto, OrganizationNoteAclDto>(
    id,
    data,
    moduleName,
  )

export const createOrganizationNoteAcl = (data: CreateOrganizationNoteAclDto) =>
  createDocument<CreateOrganizationNoteAclDto, OrganizationNoteAclDto>(
    data,
    moduleName,
  )

export const getOrganizationNoteAclById = (id: string, token?: string) =>
  getAssetById<OrganizationNoteAclDto>({ moduleName, id, token })
