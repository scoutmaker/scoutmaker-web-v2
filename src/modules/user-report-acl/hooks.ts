import {
  createUserReportAcl,
  deleteUserReportAcl,
  getUserReportAcls,
  updateUserReportAcl,
} from '@/services/api/methods/user-report-acl'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateUserReportAclDto,
  FindAllUserReportAclParams,
  UpdateUserReportAclDto,
  UserReportAclDto,
} from './types'

const moduleName: TModuleName = 'user-report-acl'

export const useUserReportAcls = (params: FindAllUserReportAclParams) =>
  usePaginatedData<FindAllUserReportAclParams, UserReportAclDto>(
    moduleName,
    params,
    getUserReportAcls,
  )

export const useDeleteUserReportAcl = () =>
  useDeleteDocument<UserReportAclDto>(moduleName, deleteUserReportAcl)

export const useUpdateUserReportAcl = (id: string) =>
  useUpdateDocument<UpdateUserReportAclDto, UserReportAclDto>(
    moduleName,
    id,
    updateUserReportAcl,
  )

export const useCreateUserReportAcl = () =>
  useCreateDocument<CreateUserReportAclDto, UserReportAclDto>(
    moduleName,
    createUserReportAcl,
  )
