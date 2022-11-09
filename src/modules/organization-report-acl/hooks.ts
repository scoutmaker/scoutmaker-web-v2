import {
  createOrganizationReportAcl,
  deleteOrganizationReportAcl,
  getOrganizationReportAcls,
  updateOrganizationReportAcl,
} from '@/services/api/methods/organization-report-acl'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateOrganizationReportAclDto,
  FindAllOrganizationReportAclParams,
  OrganizationReportAclDto,
  UpdateOrganizationReportAclDto,
} from './types'

const moduleName: TModuleName = 'organization-report-acl'

export const useOrganizationReportAcls = (
  params: FindAllOrganizationReportAclParams,
) =>
  usePaginatedData<
    FindAllOrganizationReportAclParams,
    OrganizationReportAclDto
  >(moduleName, params, getOrganizationReportAcls)

export const useDeleteOrganizationReportAcl = () =>
  useDeleteDocument<OrganizationReportAclDto>(
    moduleName,
    deleteOrganizationReportAcl,
  )

export const useUpdateOrganizationReportAcl = (id: string) =>
  useUpdateDocument<UpdateOrganizationReportAclDto, OrganizationReportAclDto>(
    moduleName,
    id,
    updateOrganizationReportAcl,
  )

export const useCreateOrganizationReportAcl = () =>
  useCreateDocument<CreateOrganizationReportAclDto, OrganizationReportAclDto>(
    moduleName,
    createOrganizationReportAcl,
  )
