import {
  CreateTeamAffiliationDto,
  FindAllTeamAffiliationsParams,
  TeamAffiliationDto,
  UpdateTeamAffiliationDto,
} from '@/modules/team-affiliations/types'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  createTeamAffiliation,
  deleteTeamAffiliation,
  getTeamAffiliations,
  updateTeamAffiliation,
} from '../../services/api/methods/team-affiliations'

const moduleName: TModuleName = 'team-affiliations'

export const useTeamAffiliations = (params: FindAllTeamAffiliationsParams) =>
  usePaginatedData<FindAllTeamAffiliationsParams, TeamAffiliationDto>(
    moduleName,
    params,
    getTeamAffiliations,
  )

export const useDeleteTeamAffiliation = () =>
  useDeleteDocument<TeamAffiliationDto>(moduleName, deleteTeamAffiliation)

export const useUpdateTeamAffiliation = (id: number) =>
  useUpdateDocument<UpdateTeamAffiliationDto, TeamAffiliationDto>(
    moduleName,
    id,
    updateTeamAffiliation,
  )

export const useCreateTeamAffiliation = () =>
  useCreateDocument<CreateTeamAffiliationDto, TeamAffiliationDto>(
    moduleName,
    createTeamAffiliation,
  )
