import { styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { GoToSectionButton } from '@/components/landing/GoToSectionButton'
import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper'
import { PricingCard } from '@/components/landing/PricingCard'

import {
  databaseAccessPricing,
  directorScoutingPricing,
  orderScoutingPricing,
} from './data'

export const PricingSection = () => {
  const { t } = useTranslation()
  const databaseAccess = databaseAccessPricing(t)
  const orderScouting = orderScoutingPricing(t)
  const directorScouting = directorScoutingPricing(t)

  return (
    <section>
      <LayoutContentWrapper sx={{ paddingBottom: 4 }}>
        <Heading variant="h2">Skauting dopasowany do twoich potrzeb</Heading>
        <Container>
          <PricingCard
            features={databaseAccess.features}
            price={databaseAccess.title}
          />
          <PricingCard
            features={orderScouting.features}
            price={orderScouting.title}
          />
          <PricingCard
            features={directorScouting.features}
            price={directorScouting.title}
          />
        </Container>
        <GoToSectionButton text="Skontaktuj się" href="#contactform" />
      </LayoutContentWrapper>
    </section>
  )
}

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  padding: theme.spacing(3, 0),

  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 15,

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}))
