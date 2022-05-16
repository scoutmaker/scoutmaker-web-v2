export interface ApiError extends Error {
  response: {
    data: {
      error: string
      success: boolean
    }
  }
}
