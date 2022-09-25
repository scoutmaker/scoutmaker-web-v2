import { styled, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

import { LayoutContentWrapper } from "@/components/landing/LayoutContentWrapper";
import { PricingCard } from "@/components/landing/PricingCard";

import { constantCooperationPricing, oneTimeServicePricing } from "./data";

interface IProps {
  onButtonClick?: () => void
}

export const PricingSection = ({ onButtonClick }: IProps) => {
  const { t } = useTranslation()

  const oneTimeServicePricingData = oneTimeServicePricing(t)
  const constantCooperationPricingData = constantCooperationPricing(t)

  return (
    <section>
      <LayoutContentWrapper>
        <Heading variant="h2" >
          Cennik
        </Heading>
        <Container>
          <PricingCard
            features={oneTimeServicePricingData.features}
            priceFrom
            price={oneTimeServicePricingData.price}
            buttonText={t('landing:ASK_FOR_PRICE')}
            onButtonClick={onButtonClick}
          />
          <PricingCard
            features={constantCooperationPricingData.features}
            priceFrom
            price={constantCooperationPricingData.price}
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
