import {
  ClubBasicDataDto,
  ClubDto,
  CreateClubDto,
  FindAllClubsParams,
  UpdateClubDto,
} from '@/modules/clubs/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetBySlug,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'clubs'

export const getClubBySlug = (slug: string, token?: string) =>
  getAssetBySlug<ClubDto>({ moduleName, slug, token })

export const getClubsList = () => getDataList<ClubBasicDataDto>(moduleName)

export const getClubs = (params: FindAllClubsParams) =>
  getPaginatedData<FindAllClubsParams, ClubDto>(params, moduleName)

export const createClub = (data: CreateClubDto) =>
  createDocument<CreateClubDto, ClubDto>(data, moduleName)

interface IUpdateClubArgs {
  id: string
  data: UpdateClubDto
}

export const updateClub = ({ id, data }: IUpdateClubArgs) =>
  updateDocument<UpdateClubDto, ClubDto>(id, data, moduleName)

export const deleteClub = (id: string) =>
  deleteDocument<ClubDto>(id, moduleName)
