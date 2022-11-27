import { format } from 'date-fns'

export function formatDate(date?: string) {
  return format(date ? new Date(date) : new Date(), 'yyyy-MM-dd')
}
