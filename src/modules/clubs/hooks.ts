import {
  ClubBasicDataDto,
  ClubDto,
  CreateClubDto,
  FindAllClubsParams,
  UpdateClubDto,
} from '@/modules/clubs/types'
import {
  createClub,
  deleteClub,
  getClubs,
  getClubsList,
  updateClub,
} from '@/services/api/methods/clubs'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'clubs'

export const useClubsList = () =>
  useList<ClubBasicDataDto>(moduleName, getClubsList)

export const useClubs = (params: FindAllClubsParams) =>
  usePaginatedData<FindAllClubsParams, ClubDto>(moduleName, params, getClubs)

export const useCreateClub = () =>
  useCreateDocument<CreateClubDto, ClubDto>(moduleName, createClub)

export const useUpdateClub = (id: string) =>
  useUpdateDocument<UpdateClubDto, ClubDto>(moduleName, id, updateClub)

export const useDeleteClub = () =>
  useDeleteDocument<ClubDto>(moduleName, deleteClub)
