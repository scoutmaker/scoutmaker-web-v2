import React, { useMemo } from 'react'

import { ICompetitionGroupComboOptions } from '@/modules/competition-groups/types'
import { ICompetitionComboOptions } from '@/modules/competitions/types'

import { FilterCombo, IComboProps } from '../combo/combo'

interface IProps extends Omit<IComboProps, 'data'> {
  competitionGroupsData: ICompetitionGroupComboOptions[]
  competitionsFormValues: ICompetitionComboOptions[]
}

const FilteredCompetitonGroups = ({
  competitionGroupsData,
  competitionsFormValues,
  ...rest
}: IProps) => {
  const filteredGroupsData = useMemo(
    () =>
      competitionGroupsData.filter(group =>
        competitionsFormValues?.some(comp => comp.id === group.competition.id),
      ),
    [competitionsFormValues, competitionGroupsData],
  )

  return filteredGroupsData?.length ? (
    <FilterCombo data={filteredGroupsData} {...rest} />
  ) : null
}

export default FilteredCompetitonGroups
