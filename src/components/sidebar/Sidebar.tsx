import { styled } from '@mui/material/styles'

import { MatchAttendanceDto } from '@/modules/match-attendances/types'

import { NavList } from '../nav/nav-list'
import { StyledDrawer } from './styles'

interface IProps {
  matchAttendance: MatchAttendanceDto | null
}
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export const Sidebar = ({ matchAttendance }: IProps) => (
  <StyledDrawer variant="permanent" anchor="left">
    <Offset />
    <NavList matchAttendance={matchAttendance} />
  </StyledDrawer>
)
