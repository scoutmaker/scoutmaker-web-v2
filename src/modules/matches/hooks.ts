import {
  createMatch,
  deleteMatch,
  getMatches,
  getMatchesList,
  updateMatch,
} from '@/services/api/methods/matches'
import { TModuleName } from '@/services/api/modules'
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
