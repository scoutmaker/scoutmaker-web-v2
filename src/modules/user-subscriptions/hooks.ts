import {
  createUserSubscription,
  deleteUserSubscription,
  getUserSubscriptions,
  getUserSubscriptionsList,
  updateUserSubscription,
} from '@/services/api/methods/user-subscriptions'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateUserSubscriptionDto,
  FindAllUserSubscriptionsParams,
  UpdateUserSubscriptionDto,
  UserSubscriptionDto,
} from './types'

const moduleName: TModuleName = 'user-subscriptions'

export const useUserSubscriptionsList = () =>
  useList<UserSubscriptionDto>(moduleName, getUserSubscriptionsList)

export const useUserSubscriptions = (params: FindAllUserSubscriptionsParams) =>
  usePaginatedData<FindAllUserSubscriptionsParams, UserSubscriptionDto>(
    moduleName,
    params,
    getUserSubscriptions,
  )

export const useDeleteUserSubscription = () =>
  useDeleteDocument<UserSubscriptionDto>(moduleName, deleteUserSubscription)

export const useUpdateUserSubscription = (id: number) =>
  useUpdateDocument<UpdateUserSubscriptionDto, UserSubscriptionDto>(
    moduleName,
    id,
    updateUserSubscription,
  )

export const useCreateUserSubscription = () =>
  useCreateDocument<CreateUserSubscriptionDto, UserSubscriptionDto>(
    moduleName,
    createUserSubscription,
  )
