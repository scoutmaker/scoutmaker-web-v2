import { styled } from '@mui/material/styles'

import { NavList } from '../nav/nav-list'
import { StyledDrawer } from './styles'

// type Props = {
//   handleQuickNoteClick: () => void;
//   handleMatchClick: () => void;
//   isAtTheMatch: boolean;
// };
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export const Sidebar = () => (
  <StyledDrawer variant="permanent" anchor="left">
    <Offset />
    <NavList
    // handleMatchClick={handleMatchClick}
    // handleQuickNoteClick={handleQuickNoteClick}
    // isAtTheMatch={isAtTheMatch}
    />
  </StyledDrawer>
)
