import { AxiosRequestConfig } from 'axios'

import { ApiResponse, TPaginatedData } from '@/services/api/types'
import {
  mapObjectToQueryParams,
  TValue,
} from '@/utils/map-object-to-query-params'

import { client } from '../api'
import { TModuleName } from '../modules'

// Get single asset by slug
interface IGetAssetBySlug {
  moduleName: TModuleName
  slug: string
  token?: string
}

export async function getAssetBySlug<DataType>({
  moduleName,
  slug,
  token,
}: IGetAssetBySlug) {
  const config: AxiosRequestConfig = token
    ? { headers: { 'x-auth-token': token } }
    : {}

  const { data } = await client.get<ApiResponse<DataType>>(
    `/${moduleName}/by-slug/${slug}`,
    config,
  )

  return data.data
}

// Get single asset by id
interface IGetAssetByIdArgs {
  moduleName: TModuleName
  id: string
  token?: string
}

export async function getAssetById<DataType>({
  moduleName,
  id,
  token,
}: IGetAssetByIdArgs) {
  const config: AxiosRequestConfig = token
    ? { headers: { 'x-auth-token': token } }
    : {}

  const { data } = await client.get<ApiResponse<DataType>>(
    `/${moduleName}/${id}`,
    config,
  )

  return data.data
}

// Get data list
export async function getDataList<
  DataType,
  ParamsType extends Record<string, TValue> = {},
>(moduleName: TModuleName, params?: ParamsType): Promise<DataType[]> {
  const query = params ? mapObjectToQueryParams(params) : undefined
  const { data } = await client.get<ApiResponse<DataType[]>>(
    `/${moduleName}/list${query ? `?${query}` : ''}`,
  )
  return data.data
}

// Get paginated data
export async function getPaginatedData<
  ParamsType extends Record<string, TValue>,
  DataType,
>(params: ParamsType, moduleName: TModuleName) {
  const query = mapObjectToQueryParams(params)
  const { data } = await client.get<ApiResponse<TPaginatedData<DataType>>>(
    `/${moduleName}?${query}`,
  )
  return data.data
}

// Create new document
export async function createDocument<CreateDto, ReturnType>(
  input: CreateDto,
  moduleName: TModuleName,
): Promise<ApiResponse<ReturnType>> {
  const { data } = await client.post<ApiResponse<ReturnType>>(
    `/${moduleName}`,
    input,
  )
  return data
}

// Update document
export async function updateDocument<UpdateDto, ReturnType>(
  id: number,
  input: UpdateDto,
  moduleName: TModuleName,
): Promise<ApiResponse<ReturnType>> {
  const { data } = await client.patch<ApiResponse<ReturnType>>(
    `/${moduleName}/${id}`,
    input,
  )
  return data
}

// Delete document
export async function deleteDocument<ReturnType>(
  id: number,
  moduleName: TModuleName,
): Promise<ApiResponse<ReturnType>> {
  const { data } = await client.delete<ApiResponse<ReturnType>>(
    `/${moduleName}/${id}`,
  )
  return data
}

// Like document
export async function likeDocument<ReturnType>(
  id: number,
  moduleName: TModuleName,
): Promise<ApiResponse<ReturnType>> {
  const { data } = await client.post<ApiResponse<ReturnType>>(
    `/like-${moduleName}/${id}`,
  )
  return data
}

// Unlike document
export async function unlikeDocument<ReturnType>(
  id: number,
  moduleName: TModuleName,
): Promise<ApiResponse<ReturnType>> {
  const { data } = await client.delete<ApiResponse<ReturnType>>(
    `/like-${moduleName}/${id}`,
  )
  return data
}
