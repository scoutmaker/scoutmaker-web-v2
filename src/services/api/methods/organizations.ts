import {
  CreateOrganizationDto,
  FindAllOrganizationsParams,
  OrganizationBasicDataDto,
  OrganizationDto,
  UpdateOrganizationDto,
} from '@/modules/organizations/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

import { client } from '../api'
import { ApiResponse } from '../types'

const moduleName: TModuleName = 'organizations'

export const getOrganizationsList = () =>
  getDataList<OrganizationBasicDataDto>(moduleName)

export const getOrganizations = (params: FindAllOrganizationsParams) =>
  getPaginatedData<FindAllOrganizationsParams, OrganizationDto>(
    params,
    moduleName,
  )

export const deleteOrganization = (id: string) =>
  deleteDocument<OrganizationDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateOrganizationDto
}
export const updateOrganization = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateOrganizationDto, OrganizationDto>(id, data, moduleName)

export const createOrganization = (data: CreateOrganizationDto) =>
  createDocument<CreateOrganizationDto, OrganizationDto>(data, moduleName)

export const getOrganizationById = (id: string, token?: string) =>
  getAssetById<OrganizationDto>({ moduleName, id, token })

export const addMemberOrganization = (id: string, memberId: string) =>
  toggleMemberDocument(id, memberId, 'add-member')

export const removeMemberOrganization = (id: string, memberId: string) =>
  toggleMemberDocument(id, memberId, 'remove-member')

async function toggleMemberDocument(
  id: string,
  memberId: string,
  action: 'add-member' | 'remove-member',
) {
  const { data } = await client.patch<ApiResponse<OrganizationDto>>(
    `/${moduleName}/${id}/${action}`,
    { memberId },
  )
  return data
}
