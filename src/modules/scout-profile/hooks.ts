import {
  createScoutProfile,
  deleteScoutProfile,
  updateScoutProfile,
} from '@/services/api/methods/scout-profiles'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateScouProfileDto,
  ScoutProfileDto,
  UpdateScouProfileDto,
} from './types'

const moduleName: TModuleName = 'scout-profiles'

export const useDeleteScoutProfile = () =>
  useDeleteDocument<ScoutProfileDto>(moduleName, deleteScoutProfile)

export const useUpdateScoutProfile = (id: string) =>
  useUpdateDocument<UpdateScouProfileDto, ScoutProfileDto>(
    moduleName,
    id,
    updateScoutProfile,
  )

export const useCreateScoutProfile = () =>
  useCreateDocument<CreateScouProfileDto, ScoutProfileDto>(
    moduleName,
    createScoutProfile,
  )
