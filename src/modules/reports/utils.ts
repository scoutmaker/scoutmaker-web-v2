import { TFiltersStateData } from '@/components/combo/utils'
import {
  RATING_RANGE_END_MAP,
  RATING_RANGE_START_MAP,
} from '@/utils/rating-range-maps'
import { Routes } from '@/utils/routes'

import { useLikePlayer } from '../players/hooks'
import { useLikeReport } from './hooks'
import {
  IReportsComboOptions,
  ReportBasicDataDto,
  ReportDto,
  ReportPaginatedDataDto,
  ReportsFiltersState,
} from './types'

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

export const useOnLikeReportClick = () => {
  const { mutate: likeReport, isLoading: likeReportLoading } = useLikeReport()
  const { mutate: likePlayer, isLoading: likePlayerLoading } = useLikePlayer()

  const onLikeClick = (report: ReportPaginatedDataDto) => {
    likeReport(report.id)
    likePlayer(report.player.id)
  }

  return {
    likeReport: onLikeClick,
    likeReportLoading: likePlayerLoading || likeReportLoading,
  }
}
