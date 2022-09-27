import { Grid, styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper'

import { transfers } from '../data'
import { TransferCard } from './TransferCard'

export const TransfersSection = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <LayoutContentWrapper>
        <Heading variant="h2">{t('landing-scouting:ACTIVITY_EFFECTS')}</Heading>
        <Grid container spacing={3}>
          {transfers.map(transfer => (
            <Grid
              item
              xl={3}
              lg={3}
              md={6}
              sm={6}
              xs={12}
              key={transfer.player.name}
            >
              <TransferCard transfer={transfer} />
            </Grid>
          ))}
        </Grid>
      </LayoutContentWrapper>
    </Container>
  )
}

const Container = styled('section')(({ theme }) => ({
  background: '#000',
  color: theme.palette.primary.contrastText,
}))

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  padding: theme.spacing(3, 0),

  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))
