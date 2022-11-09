import { styled } from '@mui/material/styles'

import { NavList } from '../nav/nav-list'
import { StyledDrawer } from './styles'

interface IProps {
  currentMatchId: string | null
}
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export const Sidebar = ({ currentMatchId }: IProps) => (
  <StyledDrawer variant="permanent" anchor="left">
    <Offset />
    <NavList currentMatchId={currentMatchId} />
  </StyledDrawer>
)
