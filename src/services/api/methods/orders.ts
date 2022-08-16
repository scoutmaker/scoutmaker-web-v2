import {
  CreateOrderDto,
  FindAllOrdersParams,
  OrderDto,
} from '@/modules/orders/types'

import { client } from '../api'
import { TModuleName } from '../modules'
import { ApiResponse } from '../types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
} from './helpers'

const moduleName: TModuleName = 'orders'

export const getOrderById = (id: number, token?: string) =>
  getAssetById<OrderDto>({ moduleName, id, token })

export const getOrders = (params: FindAllOrdersParams) =>
  getPaginatedData<FindAllOrdersParams, OrderDto>(params, moduleName)

export const createOrder = (data: CreateOrderDto) =>
  createDocument<CreateOrderDto, OrderDto>(data, moduleName)

export const deleteOrder = (id: number) =>
  deleteDocument<OrderDto>(id, moduleName)

export const acceptOrder = (id: number) =>
  toggleOrderState<OrderDto>(id, 'accept')

export const rejectOrder = (id: number) =>
  toggleOrderState<OrderDto>(id, 'reject')

export const closeOrder = (id: number) =>
  toggleOrderState<OrderDto>(id, 'close')

async function toggleOrderState<ReturnType>(
  id: number,
  setState: 'accept' | 'reject' | 'close',
): Promise<ApiResponse<ReturnType>> {
  const { data } = await client.patch<ApiResponse<ReturnType>>(
    `/${moduleName}/${id}/${setState}`,
  )
  return data
}
