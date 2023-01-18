import { formatDate } from '@/utils/format-date'

import { useLikePlayer } from '../players/hooks'
import { useLikeReport } from './hooks'
import {
  IReportsComboOptions,
  ReportBasicDataDto,
  ReportDto,
  ReportPaginatedDataDto,
} from './types'

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

export const getReportHref = (report: ReportPaginatedDataDto) => {
  const data = [report.id, report.player.slug]

  if (report.meta?.team) data.push(report.meta.team.slug)

  if (report.match) data.push(formatDate(report.match.date))

  return `/reports/${data.join('-')}`
}
