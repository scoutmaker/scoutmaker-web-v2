import {
  createOrganizationNoteAcl,
  deleteOrganizationNoteAcl,
  getOrganizationNoteAcls,
  updateOrganizationNoteAcl,
} from '@/services/api/methods/organization-note-acl'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateOrganizationNoteAclDto,
  FindAllOrganizationNoteAclsParams,
  OrganizationNoteAclDto,
  UpdateOrganizationNoteAclDto,
} from './types'

const moduleName: TModuleName = 'organization-note-acl'

export const useOrganizationNoteAcls = (
  params: FindAllOrganizationNoteAclsParams,
) =>
  usePaginatedData<FindAllOrganizationNoteAclsParams, OrganizationNoteAclDto>(
    moduleName,
    params,
    getOrganizationNoteAcls,
  )

export const useDeleteOrganizationNoteAcl = () =>
  useDeleteDocument<OrganizationNoteAclDto>(
    moduleName,
    deleteOrganizationNoteAcl,
  )

export const useUpdateOrganizationNoteAcl = (id: string) =>
  useUpdateDocument<UpdateOrganizationNoteAclDto, OrganizationNoteAclDto>(
    moduleName,
    id,
    updateOrganizationNoteAcl,
  )

export const useCreateOrganizationNoteAcl = () =>
  useCreateDocument<CreateOrganizationNoteAclDto, OrganizationNoteAclDto>(
    moduleName,
    createOrganizationNoteAcl,
  )
