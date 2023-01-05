import React, { useMemo } from 'react'

import { ICompetitionGroupComboOptions } from '@/modules/competition-groups/types'
import { ICompetitionComboOptions } from '@/modules/competitions/types'

import { BasicCombo } from '../combo/basicCombo'
import { FilterCombo, IComboProps } from '../combo/combo'

interface IProps extends Omit<IComboProps, 'data' | 'name' | 'label'> {
  competitionGroupsData: ICompetitionGroupComboOptions[]
  competitionsFormValue:
    | ICompetitionComboOptions[]
    | ICompetitionComboOptions
    | string
    | string[]
    | null
  isBasicCombo?: boolean
  name: string
  label: string
}

const FilteredCompetitonGroups = ({
  competitionGroupsData,
  competitionsFormValue,
  isBasicCombo,
  ...rest
}: IProps) => {
  const filteredGroupsData = useMemo(
    () =>
      competitionGroupsData.filter(group => {
        if (!competitionsFormValue) return false
        if (typeof competitionsFormValue === 'string') {
          return competitionsFormValue === group.competition.id
        }
        if (Array.isArray(competitionsFormValue)) {
          return competitionsFormValue.some(comp =>
            typeof comp === 'string'
              ? comp === group.competition.id
              : comp.id === group.competition.id,
          )
        }
        return competitionsFormValue.id === group.competition.id
      }),
    [competitionsFormValue, competitionGroupsData],
  )

  if (!filteredGroupsData?.length) return null

  if (isBasicCombo) return <BasicCombo data={filteredGroupsData} {...rest} />

  return <FilterCombo data={filteredGroupsData} {...rest} />
}

export default FilteredCompetitonGroups
