import { styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper'
import { PricingCard } from '@/components/landing/PricingCard'

import { variantOnePricing, variantTwoPricing } from './data'

export const PricingSection = () => {
  const { t } = useTranslation()
  const variantOnePricingTrans = variantOnePricing(t)
  const variantTwoPricingTrans = variantTwoPricing(t)

  return (
    <section>
      <LayoutContentWrapper>
        <Heading variant="h2">{t('landing:PRICE_TABLE')}</Heading>
        <Container>
          <PricingCard
            features={variantOnePricingTrans.features}
            price={variantOnePricingTrans.price}
          />
          <PricingCard
            features={variantTwoPricingTrans.features}
            price={variantTwoPricingTrans.price}
          />
        </Container>
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
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(4),
  },
}))
