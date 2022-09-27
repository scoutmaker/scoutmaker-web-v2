import {
  CreateReportTemplateDto,
  FindAllReportTemplatesParams,
  ReportTemplateBasicDataDto,
  ReportTemplateDto,
  UpdateReportTemplateDto,
} from '@/modules/report-templates/types'
import {
  createReportTemplate,
  deleteReportTemplate,
  getReportTemplateById,
  getReportTemplates,
  getReportTemplatesList,
  updateReportTemplate,
} from '@/services/api/methods/report-templates'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useSingleDocument } from '@/utils/hooks/api/use-single-document'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'report-templates'

export const useReportTemplatesList = () =>
  useList<ReportTemplateBasicDataDto>(moduleName, getReportTemplatesList)

export const useReportTemplate = (id: string) =>
  useSingleDocument<ReportTemplateDto>(moduleName, id, getReportTemplateById)

export const useReportTemplates = (params: FindAllReportTemplatesParams) =>
  usePaginatedData<FindAllReportTemplatesParams, ReportTemplateDto>(
    moduleName,
    params,
    getReportTemplates,
  )

export const useDeleteReportTemplate = () =>
  useDeleteDocument<ReportTemplateDto>(moduleName, deleteReportTemplate)

export const useUpdateReportTemplate = (id: string) =>
  useUpdateDocument<UpdateReportTemplateDto, ReportTemplateDto>(
    moduleName,
    id,
    updateReportTemplate,
  )

export const useCreateReportTemplate = () =>
  useCreateDocument<CreateReportTemplateDto, ReportTemplateDto>(
    moduleName,
    createReportTemplate,
  )
