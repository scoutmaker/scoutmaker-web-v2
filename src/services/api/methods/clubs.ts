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
  getAssetBySlug,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

export const getClubBySlug = (slug: string, token?: string) =>
  getAssetBySlug<ClubDto>({ moduleName: 'clubs', slug, token })

export const getClubsList = () => getDataList<ClubBasicDataDto>('clubs')

export const getClubs = (params: FindAllClubsParams) =>
  getPaginatedData<FindAllClubsParams, ClubDto>(params, 'clubs')

export const createClub = (data: CreateClubDto) =>
  createDocument<CreateClubDto, ClubDto>(data, 'clubs')

interface IUpdateClubArgs {
  id: number
  data: UpdateClubDto
}

export const updateClub = ({ id, data }: IUpdateClubArgs) =>
  updateDocument<UpdateClubDto, ClubDto>(id, data, 'clubs')

export const deleteClub = (id: number) => deleteDocument<ClubDto>(id, 'clubs')
