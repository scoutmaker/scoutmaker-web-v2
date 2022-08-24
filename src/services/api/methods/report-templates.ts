import { ReportTemplateBasicDataDto } from '@/modules/report-templates/types'
import { getDataList } from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'report-templates'

export const getReportTemplatesList = () =>
  getDataList<ReportTemplateBasicDataDto>(moduleName)
