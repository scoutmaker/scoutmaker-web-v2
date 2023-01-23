import {
  Create as NotesIcon,
  LibraryBooks as ReportsIcon,
  Search as ScoutsIcon,
} from '@mui/icons-material'
import { styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { LandingPageNumbers } from '@/modules/landing-home/types'

import { AppNumber } from './AppNumber'

interface IProps {
  numbers: LandingPageNumbers
}

export const AppNumbers = ({ numbers }: IProps) => {
  const { t } = useTranslation()

  return (
    <Container>
      <AppNumber
        count={numbers?.reportsCount || 0}
        title={t('landing:NUMBERS_REPORTS')}
        icon={<ReportsIcon />}
      />
      <Divider />
      <AppNumber
        count={numbers?.notesCount || 0}
        title={t('landing:NUMBERS_NOTES')}
        icon={<NotesIcon />}
      />
      <Divider />
      <AppNumber
        count={numbers?.scoutsCount || 0}
        title={t('landing:NUMBERS_SCOUTS')}
        icon={<ScoutsIcon />}
      />
    </Container>
  )
}

const Divider = styled('div')(({ theme }) => ({
  width: 2,
  height: 50,
  background: theme.palette.primary.contrastText,

  [theme.breakpoints.down('sm')]: {
    height: 2,
    width: '50%',
  },
}))

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))
