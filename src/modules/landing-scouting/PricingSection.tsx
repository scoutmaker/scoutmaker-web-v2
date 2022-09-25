import { styled, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

import { LayoutContentWrapper } from "@/components/landing/LayoutContentWrapper";
import { PricingCard } from "@/components/landing/PricingCard";

import { mainPricing } from "./data";

type Props = {
  onButtonClick?: () => void;
};

export const PricingSection = ({ onButtonClick }: Props) => {
  const { t } = useTranslation()
  const mainPricingTranslated = mainPricing(t)

  return (
    <section>
      <LayoutContentWrapper>
        <Heading variant="h2">
          {t('landing:PRICE_TABLE')}
        </Heading>
        <Container>
          <PricingCard
            features={mainPricingTranslated.features}
            priceFrom
            price={mainPricingTranslated.price}
            buttonText={t('landing-scouting:COME_TO_US')}
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

const Container = styled('div')({
  maxWidth: 600,
  margin: '0 auto',
})
