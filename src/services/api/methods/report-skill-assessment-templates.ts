import {
  CreateReportSkillAssessmentTemplateDto,
  FindAllReportSkillAssessmentTemplatesParams,
  ReportSkillAssessmentTemplateDto,
  UpdateReportSkillAssessmentTemplateDto,
} from '@/modules/report-skill-assessment-templates/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'report-skill-assessment-templates'

export const getReportSkillAssessmentTemplatesList = () =>
  getDataList<ReportSkillAssessmentTemplateDto>(moduleName)

export const getReportSkillAssessmentTemplates = (
  params: FindAllReportSkillAssessmentTemplatesParams,
) =>
  getPaginatedData<
    FindAllReportSkillAssessmentTemplatesParams,
    ReportSkillAssessmentTemplateDto
  >(params, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateReportSkillAssessmentTemplateDto
}

export const updateReportSkillAssessmentTemplate = ({
  id,
  data,
}: IUpdateArgs) =>
  updateDocument<
    UpdateReportSkillAssessmentTemplateDto,
    ReportSkillAssessmentTemplateDto
  >(id, data, moduleName)

export const deleteReportSkillAssessmentTemplate = (id: string) =>
  deleteDocument<ReportSkillAssessmentTemplateDto>(id, moduleName)

export const createReportSkillAssessmentTemplate = (
  data: CreateReportSkillAssessmentTemplateDto,
) =>
  createDocument<
    CreateReportSkillAssessmentTemplateDto,
    ReportSkillAssessmentTemplateDto
  >(data, moduleName)

export const getReportSkillAssessmentTemplateById = (
  id: string,
  token?: string,
) => getAssetById<ReportSkillAssessmentTemplateDto>({ moduleName, id, token })
