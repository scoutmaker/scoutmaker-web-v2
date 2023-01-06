import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import {
  getUsers,
  getUsersList,
  setUserRole,
} from '@/services/api/methods/users'
import { TModuleName } from '@/services/api/modules'
import { ApiError, ApiResponse } from '@/services/api/types'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'

import { FindAllUsersParams, UserBasicDataDto, UserDto } from './types'

const moduleName: TModuleName = 'users'

export const useUsersList = () =>
  useList<UserBasicDataDto>(moduleName, getUsersList)

export const useUsers = (params: FindAllUsersParams) =>
  usePaginatedData<FindAllUsersParams, UserDto>(moduleName, params, getUsers)

export const useSetUserRole = () =>
  useChangeRoleDocument<UserDto>(moduleName, setUserRole)

function useChangeRoleDocument<DataType>(
  key: string,
  mutationFn: (
    id: string,
    role: UserDto['role'],
  ) => Promise<ApiResponse<DataType>>,
) {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation(
    ({ id, role }: { id: string; role: UserDto['role'] }) =>
      mutationFn(id, role),
    {
      onSuccess: data => {
        setAlert({
          msg: data.message,
          type: 'success',
        })
        queryClient.invalidateQueries([key])
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: err.response.data.message,
          type: 'error',
        }),
    },
  )
}
