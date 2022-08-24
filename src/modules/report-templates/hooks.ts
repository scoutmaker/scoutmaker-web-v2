import { ReportTemplateBasicDataDto } from '@/modules/report-templates/types'
import { getReportTemplatesList } from '@/services/api/methods/report-templates'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'

const moduleName: TModuleName = 'report-templates'

export const useReportTemplatesList = () =>
  useList<ReportTemplateBasicDataDto>(moduleName, getReportTemplatesList)
