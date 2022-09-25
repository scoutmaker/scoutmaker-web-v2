import { styled, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

import { LayoutContentWrapper } from "@/components/landing/LayoutContentWrapper";
import { PricingCard } from "@/components/landing/PricingCard";

import { historicalDataPricing } from "./data";


type Props = {
  onButtonClick?: () => void;
};

export const HistoricalDataSection = ({ onButtonClick }: Props) => {
  const { t } = useTranslation()
  const historicalDataPricingTranslated = historicalDataPricing(t)

  return (
    <section>
      <LayoutContentWrapper>
        <Heading variant="h2">
          {t('landing-scouting:HISTORICAL_DATA_ACCESS')}
        </Heading>
        <Container>
          <PricingCard
            features={historicalDataPricingTranslated.features}
            price={historicalDataPricingTranslated.price}
            buttonText={t('landing-scouting:REQUEST_PRICE')}
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
