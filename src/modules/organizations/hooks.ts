import { useMutation, useQueryClient } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import {
  addMemberOrganization,
  createOrganization,
  deleteOrganization,
  getOrganizations,
  getOrganizationsList,
  removeMemberOrganization,
  updateOrganization,
} from '@/services/api/methods/organizations'
import { TModuleName } from '@/services/api/modules'
import { ApiError, ApiResponse } from '@/services/api/types'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateOrganizationDto,
  FindAllOrganizationsParams,
  OrganizationDto,
  UpdateOrganizationDto,
} from './types'

const moduleName: TModuleName = 'organizations'

export const useOrganizationsList = () =>
  useList<OrganizationDto>(moduleName, getOrganizationsList)

export const useOrganizations = (params: FindAllOrganizationsParams) =>
  usePaginatedData<FindAllOrganizationsParams, OrganizationDto>(
    moduleName,
    params,
    getOrganizations,
  )

export const useDeleteOrganization = () =>
  useDeleteDocument<OrganizationDto>(moduleName, deleteOrganization)

export const useUpdateOrganization = (id: number) =>
  useUpdateDocument<UpdateOrganizationDto, OrganizationDto>(
    moduleName,
    id,
    updateOrganization,
  )

export const useCreateOrganization = () =>
  useCreateDocument<CreateOrganizationDto, OrganizationDto>(
    moduleName,
    createOrganization,
  )

export const useAddMemberOrganization = () =>
  useMemberDocument(addMemberOrganization)

export const useRemoveMemberOrganization = () =>
  useMemberDocument(removeMemberOrganization)

interface Ivalues {
  organizationId: number
  memberId: number
}

function useMemberDocument(
  mutationFn: (
    organizationId: number,
    memberId: number,
  ) => Promise<ApiResponse<OrganizationDto>>,
) {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation(
    (values: Ivalues) => mutationFn(values.organizationId, values.memberId),
    {
      onSuccess: data => {
        setAlert({
          msg: data.message,
          type: 'success',
        })
        queryClient.invalidateQueries(moduleName)
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: err.response.data.message,
          type: 'error',
        }),
    },
  )
}
