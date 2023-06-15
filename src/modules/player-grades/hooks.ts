import {
  createPlayerGrade,
  deletePlayerGrade,
  getPlayerGrades,
  getPlayerGradesList,
  updatePlayerGrade,
} from '@/services/api/methods/player-grades'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreatePlayerGradeDto,
  FindAllPlayerGradesParams,
  PlayerGradeDto,
  UpdatePlayerGradeDto,
} from './types'

const moduleName: TModuleName = 'player-grades'

export const usePlayerGradesList = () =>
  useList<PlayerGradeDto>(moduleName, getPlayerGradesList)

export const usePlayerGrades = (params: FindAllPlayerGradesParams) =>
  usePaginatedData<FindAllPlayerGradesParams, PlayerGradeDto>(
    moduleName,
    params,
    getPlayerGrades,
  )

export const useUpdatePlayerGrade = (id: string) =>
  useUpdateDocument<UpdatePlayerGradeDto, PlayerGradeDto>(
    moduleName,
    id,
    updatePlayerGrade,
  )

export const useDeletePlayerGrade = () =>
  useDeleteDocument<PlayerGradeDto>(moduleName, deletePlayerGrade)

export const useCreatePlayerGrade = () =>
  useCreateDocument<CreatePlayerGradeDto, PlayerGradeDto>(
    moduleName,
    createPlayerGrade,
  )
