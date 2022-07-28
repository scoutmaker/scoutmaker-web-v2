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
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

export const useClubsList = () =>
  useList<ClubBasicDataDto>('clubs', getClubsList)

export const useClubs = (params: FindAllClubsParams) =>
  usePaginatedData<FindAllClubsParams, ClubDto>('clubs', params, getClubs)

export const useCreateClub = () =>
  useCreateDocument<CreateClubDto, ClubDto>('clubs', createClub)

export const useUpdateClub = (id: number) =>
  useUpdateDocument<UpdateClubDto, ClubDto>('clubs', id, updateClub)

export const useDeleteClub = () =>
  useDeleteDocument<ClubDto>('clubs', deleteClub)
