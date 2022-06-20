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
