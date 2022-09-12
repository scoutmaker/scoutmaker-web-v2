import {
  CreateUserSubscriptionDto,
  FindAllUserSubscriptionsParams,
  UpdateUserSubscriptionDto,
  UserSubscriptionDto,
} from '@/modules/user-subscriptions/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'user-subscriptions'

export const getUserSubscriptionsList = () =>
  getDataList<UserSubscriptionDto>(moduleName)

export const getUserSubscriptions = (params: FindAllUserSubscriptionsParams) =>
  getPaginatedData<FindAllUserSubscriptionsParams, UserSubscriptionDto>(
    params,
    moduleName,
  )

export const deleteUserSubscription = (id: string) =>
  deleteDocument<UserSubscriptionDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateUserSubscriptionDto
}
export const updateUserSubscription = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateUserSubscriptionDto, UserSubscriptionDto>(
    id,
    data,
    moduleName,
  )

export const createUserSubscription = (data: CreateUserSubscriptionDto) =>
  createDocument<CreateUserSubscriptionDto, UserSubscriptionDto>(
    data,
    moduleName,
  )

export const getUserSubscriptionById = (id: string, token?: string) =>
  getAssetById<UserSubscriptionDto>({ moduleName, id, token })
