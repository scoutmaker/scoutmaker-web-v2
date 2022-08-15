import {
  CreateOrderDto,
  FindAllOrdersParams,
  OrderDto,
} from '@/modules/orders/types'

import { TModuleName } from '../modules'
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
