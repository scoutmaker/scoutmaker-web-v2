export interface ApiError extends Error {
  response: {
    status: number
    data: {
      success: boolean
      error: string
      message: string
    }
  }
}

export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export type SortingOrder = 'asc' | 'desc'

export type TPaginatedData<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export type GetPaginatedDataArgs<TFilters, TSortBy> = {
  page?: number
  limit?: number
  sort?: TSortBy | 'id'
  order: SortingOrder
  filters: TFilters
}
