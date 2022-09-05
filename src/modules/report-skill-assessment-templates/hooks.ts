import {
  createReportSkillAssessmentTemplate,
  deleteReportSkillAssessmentTemplate,
  getReportSkillAssessmentTemplates,
  getReportSkillAssessmentTemplatesList,
  updateReportSkillAssessmentTemplate,
} from '@/services/api/methods/report-skill-assessment-templates'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateReportSkillAssessmentTemplateDto,
  FindAllReportSkillAssessmentTemplatesParams,
  ReportSkillAssessmentTemplateDto,
  UpdateReportSkillAssessmentTemplateDto,
} from './types'

const moduleName: TModuleName = 'report-skill-assessment-templates'

export const useReportSkillAssessmentTemplatesList = () =>
  useList<ReportSkillAssessmentTemplateDto>(
    moduleName,
    getReportSkillAssessmentTemplatesList,
  )

export const useReportSkillAssessmentTemplates = (
  params: FindAllReportSkillAssessmentTemplatesParams,
) =>
  usePaginatedData<
    FindAllReportSkillAssessmentTemplatesParams,
    ReportSkillAssessmentTemplateDto
  >(moduleName, params, getReportSkillAssessmentTemplates)

export const useDeleteReportSkillAssessmentTemplate = () =>
  useDeleteDocument<ReportSkillAssessmentTemplateDto>(
    moduleName,
    deleteReportSkillAssessmentTemplate,
  )

export const useUpdateReportSkillAssessmentTemplate = (id: number) =>
  useUpdateDocument<
    UpdateReportSkillAssessmentTemplateDto,
    ReportSkillAssessmentTemplateDto
  >(moduleName, id, updateReportSkillAssessmentTemplate)

export const useCreateReportSkillAssessmentTemplate = () =>
  useCreateDocument<
    CreateReportSkillAssessmentTemplateDto,
    ReportSkillAssessmentTemplateDto
  >(moduleName, createReportSkillAssessmentTemplate)
