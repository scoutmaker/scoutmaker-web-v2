import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import {
  CompetitionBasicDataDto,
  ICompetitionComboOptions,
} from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'

import { FilterCombo } from '../combo/combo'

interface IProps {
  competitionsMultiple?: boolean
  groupsMultiple?: boolean
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  competitionsFormValues: ICompetitionComboOptions[] | undefined
}

const FilteredCompetitionGroups = ({
  competitionGroupsData,
  competitionsData,
  competitionsMultiple,
  groupsMultiple,
  competitionsFormValues,
}: IProps) => {
  const { t } = useTranslation()
  const competitionGroupsComboData = mapCompetitionGroupsListToComboOptions(
    competitionGroupsData,
  )

  const filteredGroupsData = useMemo(
    () =>
      competitionGroupsComboData.filter(group =>
        competitionsFormValues?.some(comp => comp.id === group.competition.id),
      ),
    [competitionsFormValues, competitionGroupsComboData],
  )

  return (
    <>
      <FilterCombo
        name="competitionIds"
        data={mapCompetitionsListToComboOptions(competitionsData)}
        label={competitionsMultiple ? t('COMPETITIONS') : t('COMPETITION')}
        size="small"
        multiple={competitionsMultiple}
      />
      {!!filteredGroupsData?.length && (
        <FilterCombo
          name="competitionGroupIds"
          data={filteredGroupsData}
          label={
            groupsMultiple ? t('COMPETITION_GROUPS') : t('COMPETITION_GROUP')
          }
          size="small"
          multiple={groupsMultiple}
        />
      )}
    </>
  )
}

export default FilteredCompetitionGroups
