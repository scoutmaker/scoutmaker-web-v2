import {
  createOrder,
  deleteOrder,
  getOrders,
} from '@/services/api/methods/orders'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'

import { CreateOrderDto, FindAllOrdersParams, OrderDto } from './types'

const moduleName: TModuleName = 'orders'

export const useOrders = (params: FindAllOrdersParams) =>
  usePaginatedData<FindAllOrdersParams, OrderDto>(moduleName, params, getOrders)

export const useCreateOrder = () =>
  useCreateDocument<CreateOrderDto, OrderDto>(moduleName, createOrder)

export const useDeleteOrder = () =>
  useDeleteDocument<OrderDto>(moduleName, deleteOrder)
