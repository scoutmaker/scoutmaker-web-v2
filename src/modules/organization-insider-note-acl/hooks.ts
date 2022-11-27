import {
  createOrganizationInsiderNoteAcl,
  deleteOrganizationInsiderNoteAcl,
  getOrganizationInsiderNoteAcls,
  updateOrganizationInsiderNoteAcl,
} from '@/services/api/methods/organization-insider-note-acl'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateOrganizationInsiderNoteAclDto,
  FindAllOrganizationInsiderNoteAclsParams,
  OrganizationInsiderNoteAclDto,
  UpdateOrganizationInsiderNoteAclDto,
} from './types'

const moduleName: TModuleName = 'organization-insider-note-acl'

export const useOrganizationInsiderNoteAcls = (
  params: FindAllOrganizationInsiderNoteAclsParams,
) =>
  usePaginatedData<
    FindAllOrganizationInsiderNoteAclsParams,
    OrganizationInsiderNoteAclDto
  >(moduleName, params, getOrganizationInsiderNoteAcls)

export const useDeleteOrganizationInsiderNoteAcl = () =>
  useDeleteDocument<OrganizationInsiderNoteAclDto>(
    moduleName,
    deleteOrganizationInsiderNoteAcl,
  )

export const useUpdateOrganizationInsiderNoteAcl = (id: string) =>
  useUpdateDocument<
    UpdateOrganizationInsiderNoteAclDto,
    OrganizationInsiderNoteAclDto
  >(moduleName, id, updateOrganizationInsiderNoteAcl)

export const useCreateOrganizationInsiderNoteAcl = () =>
  useCreateDocument<
    CreateOrganizationInsiderNoteAclDto,
    OrganizationInsiderNoteAclDto
  >(moduleName, createOrganizationInsiderNoteAcl)
