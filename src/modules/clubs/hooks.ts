import {
  ClubBasicDataDto,
  ClubDto,
  CreateClubDto,
  FindAllClubsParams,
  UpdateClubDto,
} from '@/modules/clubs/types'
import {
  createDocument,
  deleteDocument,
  getDataList,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

// Get clubs list
export const getClubsList = () => getDataList<ClubBasicDataDto>('clubs')

export const useClubsList = () =>
  useList<ClubBasicDataDto>('clubs', getClubsList)

// Get paginated clubs
export const getClubs = (params: FindAllClubsParams) =>
  getPaginatedData<FindAllClubsParams, ClubDto>(params, 'clubs')

export const useClubs = (params: FindAllClubsParams) =>
  usePaginatedData<FindAllClubsParams, ClubDto>('clubs', params, getClubs)

// Create new club
const createClub = (data: CreateClubDto) =>
  createDocument<CreateClubDto, ClubDto>(data, 'clubs')

export const useCreateClub = () => useCreateDocument('clubs', createClub)

// Update club
interface IUpdateClubArgs {
  id: number
  data: UpdateClubDto
}

const updateClub = ({ id, data }: IUpdateClubArgs) =>
  updateDocument<UpdateClubDto, ClubDto>(id, data, 'clubs')

export const useUpdateClub = (id: number) =>
  useUpdateDocument<UpdateClubDto, ClubDto>('clubs', id, updateClub)

// Delete club
const deleteClub = (id: number) => deleteDocument<ClubDto>(id, 'clubs')

export const useDeleteClub = () =>
  useDeleteDocument<ClubDto>('clubs', deleteClub)
