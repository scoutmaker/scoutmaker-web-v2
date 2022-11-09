import {
  createOrganizationPlayerAcl,
  deleteOrganizationPlayerAcl,
  getOrganizationPlayerAcls,
  updateOrganizationPlayerAcl,
} from '@/services/api/methods/organization-player-acl'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateOrganizationPlayerAclDto,
  FindAllOrganizationPlayerAclsParams,
  OrganizationPlayerAclDto,
  UpdateOrganizationPlayerAclDto,
} from './types'

const moduleName: TModuleName = 'organization-player-acl'

export const useOrganizationPlayerAcls = (
  params: FindAllOrganizationPlayerAclsParams,
) =>
  usePaginatedData<
    FindAllOrganizationPlayerAclsParams,
    OrganizationPlayerAclDto
  >(moduleName, params, getOrganizationPlayerAcls)

export const useDeleteOrganizationPlayerAcl = () =>
  useDeleteDocument<OrganizationPlayerAclDto>(
    moduleName,
    deleteOrganizationPlayerAcl,
  )

export const useUpdateOrganizationPlayerAcl = (id: string) =>
  useUpdateDocument<UpdateOrganizationPlayerAclDto, OrganizationPlayerAclDto>(
    moduleName,
    id,
    updateOrganizationPlayerAcl,
  )

export const useCreateOrganizationPlayerAcl = () =>
  useCreateDocument<CreateOrganizationPlayerAclDto, OrganizationPlayerAclDto>(
    moduleName,
    createOrganizationPlayerAcl,
  )
