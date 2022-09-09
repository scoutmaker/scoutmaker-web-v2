import {
  CreateOrganizationDto,
  FindAllOrganizationsParams,
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
  getDataList<OrganizationDto>(moduleName)

export const getOrganizations = (params: FindAllOrganizationsParams) =>
  getPaginatedData<FindAllOrganizationsParams, OrganizationDto>(
    params,
    moduleName,
  )

export const deleteOrganization = (id: number) =>
  deleteDocument<OrganizationDto>(id, moduleName)

interface IUpdateArgs {
  id: number
  data: UpdateOrganizationDto
}
export const updateOrganization = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateOrganizationDto, OrganizationDto>(id, data, moduleName)

export const createOrganization = (data: CreateOrganizationDto) =>
  createDocument<CreateOrganizationDto, OrganizationDto>(data, moduleName)

export const getOrganizationById = (id: number, token?: string) =>
  getAssetById<OrganizationDto>({ moduleName, id, token })

export const addMemberOrganization = (id: number, memberId: number) =>
  toggleMemberDocument(id, memberId, 'add-member')

export const removeMemberOrganization = (id: number, memberId: number) =>
  toggleMemberDocument(id, memberId, 'remove-member')

async function toggleMemberDocument(
  id: number,
  memberId: number,
  action: 'add-member' | 'remove-member',
) {
  const { data } = await client.patch<ApiResponse<OrganizationDto>>(
    `/${moduleName}/${id}/${action}`,
    { memberId },
  )
  return data
}
