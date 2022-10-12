import { IComboOptions } from '@/components/combo/types'

import { ReportSkillAssessmentTemplateDto } from './types'

export function mapReportSkillAssessmentTemplatesListToComboOptions(
  data: ReportSkillAssessmentTemplateDto[],
): IComboOptions[] {
  return data.map(({ id, name, category }) => ({
    id,
    label: `${name} (${category.name})`,
  }))
}
