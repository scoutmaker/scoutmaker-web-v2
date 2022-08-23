import {
  acceptOrder,
  closeOrder,
  createOrder,
  deleteOrder,
  getOrders,
  rejectOrder,
} from '@/services/api/methods/orders'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useToggleActiveDocument } from '@/utils/hooks/api/use-toggle-active-document'

import { CreateOrderDto, FindAllOrdersParams, OrderDto } from './types'

const moduleName: TModuleName = 'orders'

export const useOrders = (params: FindAllOrdersParams) =>
  usePaginatedData<FindAllOrdersParams, OrderDto>(moduleName, params, getOrders)

export const useCreateOrder = () =>
  useCreateDocument<CreateOrderDto, OrderDto>(moduleName, createOrder)

export const useDeleteOrder = () =>
  useDeleteDocument<OrderDto>(moduleName, deleteOrder)

export const useAcceptOrder = () =>
  useToggleActiveDocument<OrderDto>(moduleName, acceptOrder)

export const useRejectOrder = () =>
  useToggleActiveDocument<OrderDto>(moduleName, rejectOrder)

export const useCloseOrder = () =>
  useToggleActiveDocument<OrderDto>(moduleName, closeOrder)
