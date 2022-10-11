import { styled } from '@mui/material/styles'

import { NavList } from '../nav/nav-list'
import { StyledDrawer } from './styles'

interface IProps {
  isAtTheMatch: boolean
}
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export const Sidebar = ({ isAtTheMatch }: IProps) => (
  <StyledDrawer variant="permanent" anchor="left">
    <Offset />
    <NavList isAtTheMatch={isAtTheMatch} />
  </StyledDrawer>
)
