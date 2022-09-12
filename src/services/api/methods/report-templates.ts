import {
  ReportTemplateBasicDataDto,
  ReportTemplateDto,
} from '@/modules/report-templates/types'
import { getAssetById, getDataList } from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'report-templates'

export const getReportTemplatesList = () =>
  getDataList<ReportTemplateBasicDataDto>(moduleName)

export const getReportTemplateById = (id: string, token?: string) =>
  getAssetById<ReportTemplateDto>({ moduleName, id, token })
