import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Box, IconButton, Tooltip } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'

import { useUser } from '@/modules/auth/hooks'
import { MatchAttendanceDto } from '@/modules/match-attendances/types'

import { MatchesIcon } from '../icons'
import { Logo } from '../logo/Logo'
import { NavList } from '../nav/nav-list'
import {
  StyledButtonsContainer,
  StyledMenu,
  StyledTitle,
  StyledToolbar,
} from './styles'

interface ITopbarProps {
  matchAttendance?: MatchAttendanceDto | null
}

export const Topbar = ({ matchAttendance }: ITopbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const { t } = useTranslation()

  const { data: user } = useUser()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [router.asPath])

  return (
    <AppBar position="fixed" sx={{ zIndex: 5000 }}>
      <StyledToolbar>
        <Link href="/dashboard" passHref>
          <StyledTitle>
            <Logo />
            {user?.organizationLogoUrl && (
              <Box sx={{ width: 35, height: 35 }}>
                <Image
                  src={user.organizationLogoUrl}
                  alt="organization logo"
                  width={100}
                  height={100}
                  layout="responsive"
                />
              </Box>
            )}
          </StyledTitle>
        </Link>

        <StyledButtonsContainer>
          {!!matchAttendance && (
            <Tooltip
              title={t('MATCH_ATTENDANCE_INFO', {
                homeTeam: matchAttendance.match.homeTeam.name,
                awayTeam: matchAttendance.match.awayTeam.name,
              })}
              sx={theme => ({ marginRight: theme.spacing(1.5) })}
            >
              <MatchesIcon color="secondary" />
            </Tooltip>
          )}
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
              <NavList matchAttendance={matchAttendance || null} />
            </StyledMenu>
          </div>
        </StyledButtonsContainer>
      </StyledToolbar>
    </AppBar>
  )
}
