import {
  CreateOrderDto,
  FindAllOrdersParams,
  OrderBasicDataDto,
  OrderDto,
  OrdersBasicFiltersDto,
} from '@/modules/orders/types'

import { client } from '../api'
import { TModuleName } from '../modules'
import { ApiResponse } from '../types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
} from './helpers'

const moduleName: TModuleName = 'orders'

export const getOrderById = (id: string, token?: string) =>
  getAssetById<OrderDto>({ moduleName, id, token })

export const getOrders = (params: FindAllOrdersParams) =>
  getPaginatedData<FindAllOrdersParams, OrderDto>(params, moduleName)

export const getOrdersList = (params?: OrdersBasicFiltersDto) =>
  getDataList<OrderBasicDataDto, OrdersBasicFiltersDto>(moduleName, params)

export const createOrder = (data: CreateOrderDto) =>
  createDocument<CreateOrderDto, OrderDto>(data, moduleName)

export const deleteOrder = (id: string) =>
  deleteDocument<OrderDto>(id, moduleName)

export const acceptOrder = (id: string) =>
  toggleOrderState<OrderDto>(id, 'accept')

export const rejectOrder = (id: string) =>
  toggleOrderState<OrderDto>(id, 'reject')

export const closeOrder = (id: string) =>
  toggleOrderState<OrderDto>(id, 'close')

async function toggleOrderState<ReturnType>(
  id: string,
  setState: 'accept' | 'reject' | 'close',
): Promise<ApiResponse<ReturnType>> {
  const { data } = await client.patch<ApiResponse<ReturnType>>(
    `/${moduleName}/${id}/${setState}`,
  )
  return data
}
