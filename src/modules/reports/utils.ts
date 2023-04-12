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

type ReportAssessmentBasicDto =
  Components.Schemas.ReportSkillAssessmentBasicDataDto

type TGroupedSkills = {
  id: string
  name: string
  skills: ReportAssessmentBasicDto[]
}[]

// Scoutmaker 2.1 template skills Ids
const defaultSkillsOrder = [
  '12',
  '13',
  '15',
  '16',
  '2',
  '20',
  '24',
  '25',
  '26',
  '3',
  '7',
]

export function sortAndGroupSkills(
  skills: ReportDto['skills'],
  skillsOrder?: string[],
) {
  const sorted = [...skills]

  let sortBy: string[] = []

  if (skillsOrder && skillsOrder.length) {
    sortBy = skillsOrder
  } else if (skills.length) {
    sortBy = defaultSkillsOrder
  }

  if (sortBy.length) {
    const reversed = [...sortBy].reverse()

    reversed.forEach(orderKey => {
      const usedIdx = sorted.findIndex(
        el => el.template.id === orderKey.split('::')[0],
      )
      if (usedIdx !== -1) {
        const used = { ...sorted[usedIdx] }
        sorted.splice(usedIdx, 1)
        sorted.unshift(used)
      }
    })
  }

  const grouped: TGroupedSkills = []

  sorted.forEach(skill => {
    const foundIdx = grouped.findIndex(g => g.id === skill.template.category.id)

    if (foundIdx !== -1) {
      grouped[foundIdx].skills.push(skill)
    } else {
      grouped.push({
        id: skill.template.category.id,
        name: skill.template.category.name,
        skills: [skill],
      })
    }
  })

  return grouped
}
