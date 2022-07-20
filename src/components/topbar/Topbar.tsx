import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, IconButton } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { Logo } from '../logo/Logo'
import { NavList } from '../nav/nav-list'
// import { Match } from '../../types/matches';
import {
  StyledButtonsContainer,
  StyledMenu,
  StyledTitle,
  StyledToolbar,
} from './styles'

// interface ITopbarProps {
//   handleQuickNoteClick: () => void
//   handleMatchClick: () => void
//   // match: Match | null;
// }

export const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [router.asPath])

  return (
    <AppBar position="fixed" sx={{ zIndex: 5000 }}>
      <StyledToolbar>
        <Link href="/" passHref>
          <StyledTitle>
            <Logo />
          </StyledTitle>
        </Link>
        <StyledButtonsContainer>
          {/* {match ? (
            <Tooltip
              title={`Jesteś na meczu ${match.homeTeam.name} - ${match.awayTeam.name}`}
            >
              <StyledMatchIcon color="secondary" />
            </Tooltip>
          ) : null} */}
          <div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={() => setIsMenuOpen(true)}
              ref={ref}
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
              id="menu"
              anchorEl={ref.current}
              keepMounted
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            >
              <NavList
              // handleMatchClick={handleMatchClick}
              // handleQuickNoteClick={handleQuickNoteClick}
              // isAtTheMatch={!!match}
              />
            </StyledMenu>
          </div>
        </StyledButtonsContainer>
      </StyledToolbar>
    </AppBar>
  )
}
