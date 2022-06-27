import { useState, useRef, useEffect } from 'react'
import { AppBar, IconButton, Menu } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import { Match } from '../../types/matches';
import {
  StyledButtonsContainer,
  StyledMatchIcon,
  StyledMenu,
  StyledTitle,
  StyledToolbar,
} from './styles'
import { Logo } from '../logo/Logo'
import { NavList } from '../nav/nav-list'

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
    <AppBar position="fixed">
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
