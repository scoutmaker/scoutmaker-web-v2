import {
  CreateSeasonDto,
  FindAllSeasonsParams,
  SeasonDto,
  UpdateSeasonDto,
} from '@/modules/seasons/types'
import {
  createSeason,
  deleteSeason,
  getSeasons,
  getSeasonsList,
  setActiveSeason,
  unSetActiveSeason,
  updateSeason,
} from '@/services/api/methods/seasons'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useToggleActiveDocument } from '@/utils/hooks/api/use-toggle-active-document'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'seasons'

export const useSeasonsList = () =>
  useList<SeasonDto>(moduleName, getSeasonsList)

export const useSeasons = (params: FindAllSeasonsParams) =>
  usePaginatedData<FindAllSeasonsParams, SeasonDto>(
    moduleName,
    params,
    getSeasons,
  )

export const useDeleteSeason = () =>
  useDeleteDocument<SeasonDto>(moduleName, deleteSeason)

export const useUpdateSeason = (id: number) =>
  useUpdateDocument<UpdateSeasonDto, SeasonDto>(moduleName, id, updateSeason)

export const useCreateSeason = () =>
  useCreateDocument<CreateSeasonDto, SeasonDto>(moduleName, createSeason)

export const useSetActiveSeason = () =>
  useToggleActiveDocument<SeasonDto>(moduleName, setActiveSeason)

export const useUnSetActiveSeason = () =>
  useToggleActiveDocument<SeasonDto>(moduleName, unSetActiveSeason)
