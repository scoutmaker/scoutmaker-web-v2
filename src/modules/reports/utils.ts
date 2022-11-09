import {
  RATING_RANGE_END_MAP,
  RATING_RANGE_START_MAP,
} from '@/utils/rating-range-maps'
import { Routes } from '@/utils/routes'

import {
  IReportsComboOptions,
  ReportBasicDataDto,
  ReportsFilterFormData,
  ReportsFiltersDto,
  ReportDto,
} from './types'

export function getSingleReportRoute(id: string) {
  return `${Routes.REPORTS}/${id}`
}

export function mapFilterFormDataToFiltersDto(
  data: ReportsFilterFormData,
): ReportsFiltersDto {
  const { ratingRange, ...rest } = data

  return {
    ...rest,
    percentageRatingRangeStart: RATING_RANGE_START_MAP[ratingRange],
    percentageRatingRangeEnd: RATING_RANGE_END_MAP[ratingRange],
  }
}

export function mapReportsListToComboOptions(
  data: ReportBasicDataDto[],
): IReportsComboOptions[] {
  return data.map(({ id, author, docNumber, player, status }) => ({
    id,
    label: `${player.firstName} ${player.lastName} (${docNumber})`,
    author,
    docNumber,
    player,
    status,
  }))

type GroupedReportSkills = Partial<Record<string, ReportDto['skills']>>

export function groupSkillsByCategory(skills: ReportDto['skills']) {
  const groupedSkills: GroupedReportSkills = {}

  skills?.forEach(skill => {
    if (groupedSkills[skill.template.category.name]) {
      groupedSkills[skill.template.category.name]?.push(skill)
    } else {
      groupedSkills[skill.template.category.name] = [skill]
    }
  })

  return groupedSkills
}
