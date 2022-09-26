import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { CountryDto } from '@/modules/countries/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { TeamBasicDataDto } from '@/modules/teams/types'
import { UserBasicDataDto } from '@/modules/users/types'

export interface IFilterAccordionDtos {
  competitionGroupsData?: CompetitionGroupBasicDataDto[]
  competitionsData?: CompetitionBasicDataDto[]
  countriesData?: CountryDto[]
  positionsData?: PlayerPositionDto[]
  teamsData?: TeamBasicDataDto[]
  usersData?: UserBasicDataDto[]
}
