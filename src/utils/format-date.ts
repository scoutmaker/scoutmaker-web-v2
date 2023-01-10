import { format } from 'date-fns'

export function formatDate(date?: string, dateFormat?: string) {
  return format(date ? new Date(date) : new Date(), dateFormat || 'yyyy-MM-dd')
}
