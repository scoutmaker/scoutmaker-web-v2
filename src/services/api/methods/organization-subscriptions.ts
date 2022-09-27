import {
  CreateOrganizationSubscriptionDto,
  FindAllOrganizationSubscriptionsParams,
  OrganizationSubscriptionDto,
  UpdateOrganizationSubscriptionDto,
} from '@/modules/organization-subscriptions/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'organization-subscriptions'

export const getOrganizationSubscriptionsList = () =>
  getDataList<OrganizationSubscriptionDto>(moduleName)

export const getOrganizationSubscriptions = (
  params: FindAllOrganizationSubscriptionsParams,
) =>
  getPaginatedData<
    FindAllOrganizationSubscriptionsParams,
    OrganizationSubscriptionDto
  >(params, moduleName)

export const deleteOrganizationSubscription = (id: string) =>
  deleteDocument<OrganizationSubscriptionDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateOrganizationSubscriptionDto
}
export const updateOrganizationSubscription = ({ id, data }: IUpdateArgs) =>
  updateDocument<
    UpdateOrganizationSubscriptionDto,
    OrganizationSubscriptionDto
  >(id, data, moduleName)

export const createOrganizationSubscription = (
  data: CreateOrganizationSubscriptionDto,
) =>
  createDocument<
    CreateOrganizationSubscriptionDto,
    OrganizationSubscriptionDto
  >(data, moduleName)

export const getOrganizationSubscriptionById = (id: string, token?: string) =>
  getAssetById<OrganizationSubscriptionDto>({ moduleName, id, token })
