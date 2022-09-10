import {
  ReportTemplateBasicDataDto,
  ReportTemplateDto,
} from '@/modules/report-templates/types'
import {
  getReportTemplateById,
  getReportTemplatesList,
} from '@/services/api/methods/report-templates'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'
import { useSingleDocument } from '@/utils/hooks/api/use-single-document'

const moduleName: TModuleName = 'report-templates'

export const useReportTemplatesList = () =>
  useList<ReportTemplateBasicDataDto>(moduleName, getReportTemplatesList)

export const useReportTemplate = (id: number) =>
  useSingleDocument<ReportTemplateDto>(moduleName, id, getReportTemplateById)
