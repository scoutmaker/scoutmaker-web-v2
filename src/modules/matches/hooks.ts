import { useQuery } from '@tanstack/react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import {
  createMatch,
  deleteMatch,
  getMatchById,
  getMatches,
  getMatchesList,
  updateMatch,
} from '@/services/api/methods/matches'
import { TModuleName } from '@/services/api/modules'
import { ApiError } from '@/services/api/types'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateMatchDto,
  FindAllMatchesParams,
  MatchBasicDataDto,
  MatchDto,
  MatchesFiltersDto,
  UpdateMatchDto,
} from './types'

const moduleName: TModuleName = 'matches'

export function useMatchById(id: string, enabled: boolean = true) {
  const { setAlert } = useAlertsState()

  return useQuery([moduleName, 'single', id], async () => getMatchById(id), {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
    enabled,
  })
}

export const useMatchesList = (params?: MatchesFiltersDto) =>
  useList<MatchBasicDataDto, MatchesFiltersDto>(
    moduleName,
    getMatchesList,
    params,
  )

export const useMatches = (params: FindAllMatchesParams) =>
  usePaginatedData<FindAllMatchesParams, MatchDto>(
    moduleName,
    params,
    getMatches,
  )

export const useCreateMatch = () =>
  useCreateDocument<CreateMatchDto, MatchDto>(moduleName, createMatch)

export const useUpdateMatch = (id: string) =>
  useUpdateDocument<UpdateMatchDto, MatchDto>(moduleName, id, updateMatch)

export const useDeleteMatch = () =>
  useDeleteDocument<MatchDto>(moduleName, deleteMatch)
