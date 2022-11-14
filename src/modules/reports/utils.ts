import { TFiltersStateData } from '@/components/combo/utils'
import {
  RATING_RANGE_END_MAP,
  RATING_RANGE_START_MAP,
} from '@/utils/rating-range-maps'
import { Routes } from '@/utils/routes'

import { ReportDto, ReportsFiltersState } from './types'

export function getSingleReportRoute(id: string) {
  return `${Routes.REPORTS}/${id}`
}

export function mapFilterFormDataToFiltersDto(
  data: ReportsFiltersState,
): TFiltersStateData {
  const { ratingRange, ...rest } = data

  return {
    ...rest,
    percentageRatingRangeStart: RATING_RANGE_START_MAP[ratingRange],
    percentageRatingRangeEnd: RATING_RANGE_END_MAP[ratingRange],
  }
}

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
