import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import {
  CompetitionParticipationDto,
  CopyCompetitionParticipationsDto,
  CreateCompetitionParticipationDto,
  FindAllCompetitionParticipationsParams,
  UpdateCompetitionParticipationDto,
} from '@/modules/competition-participations/types'
import {
  copyCompetitionParticipations,
  createCompetitionParticipation,
  deleteCompetitionParticipation,
  getCompetitionParticipations,
  updateCompetitionParticipation,
} from '@/services/api/methods/competition-participations'
import { TModuleName } from '@/services/api/modules'
import { ApiError } from '@/services/api/types'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'competition-participations'

export const useCompetitionParticipations = (
  params: FindAllCompetitionParticipationsParams,
) =>
  usePaginatedData<
    FindAllCompetitionParticipationsParams,
    CompetitionParticipationDto
  >(moduleName, params, getCompetitionParticipations)

export const useDeleteCompetitionParticipation = () => {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation(deleteCompetitionParticipation, {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries([moduleName])
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

export const useCreateCompetitionParticipation = () =>
  useCreateDocument<
    CreateCompetitionParticipationDto,
    CompetitionParticipationDto
  >(moduleName, createCompetitionParticipation)

export const useUpdateCompetitionParticipation = (id: string) =>
  useUpdateDocument<
    UpdateCompetitionParticipationDto,
    CompetitionParticipationDto
  >(moduleName, id, updateCompetitionParticipation)

export const useCopyCompetitionParticipation = () => {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation(
    (values: CopyCompetitionParticipationsDto) =>
      copyCompetitionParticipations(values.fromSeasonId, values.toSeasonId),
    {
      onSuccess: data => {
        setAlert({
          msg: data.message,
          type: 'success',
        })
        queryClient.invalidateQueries([moduleName])
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: err.response.data.message,
          type: 'error',
        }),
    },
  )
}
