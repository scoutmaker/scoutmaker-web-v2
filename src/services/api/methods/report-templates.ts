import {
  CreateReportTemplateDto,
  FindAllReportTemplatesParams,
  ReportTemplateBasicDataDto,
  ReportTemplateDto,
  UpdateReportTemplateDto,
} from '@/modules/report-templates/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'report-templates'

export const getReportTemplatesList = () =>
  getDataList<ReportTemplateBasicDataDto>(moduleName)

export const getReportTemplateById = (id: string, token?: string) =>
  getAssetById<ReportTemplateDto>({ moduleName, id, token })

export const getReportTemplates = (params: FindAllReportTemplatesParams) =>
  getPaginatedData<FindAllReportTemplatesParams, ReportTemplateDto>(
    params,
    moduleName,
  )

export const deleteReportTemplate = (id: string) =>
  deleteDocument<ReportTemplateDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateReportTemplateDto
}
export const updateReportTemplate = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateReportTemplateDto, ReportTemplateDto>(
    id,
    data,
    moduleName,
  )

export const createReportTemplate = (data: CreateReportTemplateDto) =>
  createDocument<CreateReportTemplateDto, ReportTemplateDto>(data, moduleName)
