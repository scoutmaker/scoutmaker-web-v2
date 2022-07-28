import {
  CreateTeamDto,
  FindAllTeamsParams,
  TeamBasicDataDto,
  TeamDto,
  UpdateTeamDto,
} from '@/modules/teams/types'
import {
  createTeam,
  deleteTeam,
  getTeams,
  getTeamsList,
  likeTeam,
  unlikeTeam,
  updateTeam,
} from '@/services/api/methods/teams'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useLikeDocument } from '@/utils/hooks/api/use-like-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUnlikeDocument } from '@/utils/hooks/api/use-unlike-document'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'teams'

export const useTeamsList = () =>
  useList<TeamBasicDataDto>(moduleName, getTeamsList)

export const useTeams = (params: FindAllTeamsParams) =>
  usePaginatedData<FindAllTeamsParams, TeamDto>(moduleName, params, getTeams)

export const useCreateTeam = () =>
  useCreateDocument<CreateTeamDto, TeamDto>(moduleName, createTeam)

export const useUpdateTeam = (id: number) =>
  useUpdateDocument<UpdateTeamDto, TeamDto>(moduleName, id, updateTeam)

export const useDeleteTeam = () =>
  useDeleteDocument<TeamDto>(moduleName, deleteTeam)

export const useLikeTeam = () => useLikeDocument<TeamDto>(moduleName, likeTeam)

export const useUnlikeTeam = () =>
  useUnlikeDocument<TeamDto>(moduleName, unlikeTeam)
