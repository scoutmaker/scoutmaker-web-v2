import { styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper';
import { PricingCard } from '@/components/landing/PricingCard';

import { constantCooperationPricing, oneTimeServicePricing } from './data';

type Props = {
  onButtonClick?: () => void;
};

export const PricingSection = ({ onButtonClick }: Props) => {
  const { t } = useTranslation()
  const oneTimeServicePricingTrans = oneTimeServicePricing(t)
  const constantCooperationPricingTrans = constantCooperationPricing(t)

  return (
    <section>
      <LayoutContentWrapper>
        <Heading variant="h2" >
          {t('landing:PRICE_TABLE')}
        </Heading>
        <Container >
          <PricingCard
            features={oneTimeServicePricingTrans.features}
            priceFrom
            price={oneTimeServicePricingTrans.price}
            buttonText={t('landing:ASK_FOR_PRICE')}
            onButtonClick={onButtonClick}
          />
          <PricingCard
            features={constantCooperationPricingTrans.features}
            priceFrom
            price={constantCooperationPricingTrans.price}
            buttonText={t('landing:ASK_FOR_PRICE')}
            onButtonClick={onButtonClick}
          />
        </Container>
      </LayoutContentWrapper>
    </section>
  );
};

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  padding: theme.spacing(3, 0),

  [theme.breakpoints.down('sm')]: {
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
