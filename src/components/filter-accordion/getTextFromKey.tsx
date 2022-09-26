import { TFunction } from "next-i18next";

import { IFilterAccordionDtos } from "./types";

type ReturnType = { [key: string]: (...args: any) => string }
type SimpleNameObj = { name: string, id: string }[]

export const keyTextMap = (t: TFunction, data: IFilterAccordionDtos): ReturnType => {
  const nameRouteArray = (transTag: string, ids: string[], dataObj: SimpleNameObj | undefined) => {
    if (!dataObj) return 'NO DATA'
    const names = ids.map(id => dataObj.find(c => c.id === id)?.name)
    return `${t(transTag)}: ${names.join(', ')}`
  }

  return ({
    competitionGroupIds: (ids: string[]) => nameRouteArray('COMPETITION_GROUPS', ids, data?.competitionGroupsData),
    competitionIds: (ids: string[]) => nameRouteArray('COMPETITIONS', ids, data?.competitionsData),
    countryIds: (ids: string[]) => nameRouteArray('COUNTRIES', ids, data?.countriesData),
    positionIds: (ids: string[]) => nameRouteArray('POSITIONS', ids, data?.positionsData),
    teamIds: (ids: string[]) => nameRouteArray('TEAMS', ids, data?.teamsData),
    bornBefore: (value: number) => `${t('BORN_BEFORE')}: ${value}`,
    bornAfter: (value: number) => `${t('BORN_AFTER')}: ${value}`,
    isLiked: () => t('ONLY_LIKED'),
    footed: (value: string) => `${t('FOOTED')}: ${t(value)}`,
    name: (value: string) => value,
  })
}