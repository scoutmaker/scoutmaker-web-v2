import { TFunction } from 'next-i18next'

import { IComboOptions } from '@/components/combo/types'
import { formatDate } from '@/utils/format-date'

import { getPlayerFullName } from '../players/utils'
import { IPlayerGradesComboOptions, PlayerGradeDto } from './types'

export function mapPlayerGradesToComboOptions(
  data: PlayerGradeDto[],
  t: TFunction,
): IPlayerGradesComboOptions[] {
  return data.map(({ id, grade, player, createdAt }) => ({
    id,
    label: `${getPlayerFullName(player)} - ${t(
      `player-grades:${grade}`,
    )} (${formatDate(createdAt)})`,
  }))
}

export function gradesComboOptions(t: TFunction): IComboOptions[] {
  const grades: PlayerGradeDto['grade'][] = [
    'EEU_ROZGRYWKI',
    'EKSTRAKLASA',
    'LIGA1',
    'LIGA2',
    'LIGA3',
  ]

  return grades.map(g => ({ id: g, label: t(`player-grades:${g}`) }))
}
