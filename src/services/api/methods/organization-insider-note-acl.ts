import {
  CreateOrganizationInsiderNoteAclDto,
  FindAllOrganizationInsiderNoteAclsParams,
  OrganizationInsiderNoteAclDto,
  UpdateOrganizationInsiderNoteAclDto,
} from '@/modules/organization-insider-note-acl/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'organization-insider-note-acl'

export const getOrganizationInsiderNoteAcls = (
  params: FindAllOrganizationInsiderNoteAclsParams,
) =>
  getPaginatedData<
    FindAllOrganizationInsiderNoteAclsParams,
    OrganizationInsiderNoteAclDto
  >(params, moduleName)

export const deleteOrganizationInsiderNoteAcl = (id: string) =>
  deleteDocument<OrganizationInsiderNoteAclDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateOrganizationInsiderNoteAclDto
}
export const updateOrganizationInsiderNoteAcl = ({ id, data }: IUpdateArgs) =>
  updateDocument<
    UpdateOrganizationInsiderNoteAclDto,
    OrganizationInsiderNoteAclDto
  >(id, data, moduleName)

export const createOrganizationInsiderNoteAcl = (
  data: CreateOrganizationInsiderNoteAclDto,
) =>
  createDocument<
    CreateOrganizationInsiderNoteAclDto,
    OrganizationInsiderNoteAclDto
  >(data, moduleName)

export const getOrganizationInsiderNoteAclById = (id: string, token?: string) =>
  getAssetById<OrganizationInsiderNoteAclDto>({ moduleName, id, token })
