import {
  CreateUserReportAclDto,
  FindAllUserReportAclParams,
  UpdateUserReportAclDto,
  UserReportAclDto,
} from '@/modules/user-report-acl/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'user-report-acl'

export const getUserReportAcls = (params: FindAllUserReportAclParams) =>
  getPaginatedData<FindAllUserReportAclParams, UserReportAclDto>(
    params,
    moduleName,
  )

export const deleteUserReportAcl = (id: string) =>
  deleteDocument<UserReportAclDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateUserReportAclDto
}
export const updateUserReportAcl = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateUserReportAclDto, UserReportAclDto>(id, data, moduleName)

export const createUserReportAcl = (data: CreateUserReportAclDto) =>
  createDocument<CreateUserReportAclDto, UserReportAclDto>(data, moduleName)

export const getUserReportAclById = (id: string, token?: string) =>
  getAssetById<UserReportAclDto>({ moduleName, id, token })
