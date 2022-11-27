import {
  IReportSkillAssessmentTemplateComboOptions,
  ReportSkillAssessmentTemplateDto,
} from './types'

export function mapReportSkillAssessmentTemplatesListToComboOptions(
  data: ReportSkillAssessmentTemplateDto[],
): IReportSkillAssessmentTemplateComboOptions[] {
  return data.map(({ id, name, category }) => ({
    id,
    label: `${name} (${category.name})`,
    name,
    category,
  }))
}
