import {
  createOrganizationSubscription,
  deleteOrganizationSubscription,
  getOrganizationSubscriptions,
  getOrganizationSubscriptionsList,
  updateOrganizationSubscription,
} from '@/services/api/methods/organization-subscriptions'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateOrganizationSubscriptionDto,
  FindAllOrganizationSubscriptionsParams,
  OrganizationSubscriptionDto,
  UpdateOrganizationSubscriptionDto,
} from './types'

const moduleName: TModuleName = 'organization-subscriptions'

export const useOrganizationSubscriptionsList = () =>
  useList<OrganizationSubscriptionDto>(
    moduleName,
    getOrganizationSubscriptionsList,
  )

export const useOrganizationSubscriptions = (
  params: FindAllOrganizationSubscriptionsParams,
) =>
  usePaginatedData<
    FindAllOrganizationSubscriptionsParams,
    OrganizationSubscriptionDto
  >(moduleName, params, getOrganizationSubscriptions)

export const useDeleteOrganizationSubscription = () =>
  useDeleteDocument<OrganizationSubscriptionDto>(
    moduleName,
    deleteOrganizationSubscription,
  )

export const useUpdateOrganizationSubscription = (id: string) =>
  useUpdateDocument<
    UpdateOrganizationSubscriptionDto,
    OrganizationSubscriptionDto
  >(moduleName, id, updateOrganizationSubscription)

export const useCreateOrganizationSubscription = () =>
  useCreateDocument<
    CreateOrganizationSubscriptionDto,
    OrganizationSubscriptionDto
  >(moduleName, createOrganizationSubscription)
