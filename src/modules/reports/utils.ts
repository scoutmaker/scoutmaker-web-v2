import { Routes } from '@/utils/routes'

export function getSingleReportRoute(id: number) {
  return `${Routes.REPORTS}/${id}`
}
