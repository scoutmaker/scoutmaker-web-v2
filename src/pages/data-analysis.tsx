import { CssBaseline } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

import { AdvantagesSection } from "@/components/landing/AdvantagesSection";
import { ContactFormModal } from "@/components/landing/ContactFormModal";
import { CopySection } from "@/components/landing/CopySection";
import { EffectsSection } from "@/components/landing/EffectsSection";
import { Footer } from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import { withSessionSsr } from "@/modules/auth/session";
import { advantages, copyData, effects, heroData } from "@/modules/landing-data/data";
import { HowDoWeWorkSection } from "@/modules/landing-data/HowDoWeWorkSection";
import { PricingSection } from "@/modules/landing-data/PricingSection";

export const getServerSideProps = withSessionSsr(
  async ({ locale }) => {
    const translations = await serverSideTranslations(locale || 'pl', [
      'landing', 'common', 'landing-data',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const DataAnalysisPage = () => {
  const [isContactFormModalOpen, setIsContactFormModalOpen] = useState(false);
  const { t } = useTranslation()
  const heroDataTrans = heroData(t)
  const copyDataTrans = copyData(t)
  const advantagesDataTrans = advantages(t)
  const effectsDataTrans = effects(t)

  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroDataTrans} />
        <CopySection {...copyDataTrans} />
        <AdvantagesSection advantages={advantagesDataTrans} />
        <EffectsSection effects={effectsDataTrans} title={t('landing-data:DATA_ANALYSIS_EXAMPLES')} />
        <HowDoWeWorkSection />
        <PricingSection onButtonClick={() => setIsContactFormModalOpen(true)} />
        <ContactFormModal
          open={isContactFormModalOpen}
          onClose={() => setIsContactFormModalOpen(false)}
        />
      </main>
      <Footer />
    </>
  );
};

export default DataAnalysisPage
