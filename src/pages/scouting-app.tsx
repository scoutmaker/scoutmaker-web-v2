import { CssBaseline } from "@mui/material";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AdvantagesSection } from "@/components/landing/AdvantagesSection";
import { CopySection } from "@/components/landing/CopySection";
import { Footer } from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import { advantages, copyData, heroData, testimonials } from "@/modules/landing-app/data";
import { FunctionalitySection } from "@/modules/landing-app/FunctionalitySection";
import { PricingSection } from "@/modules/landing-app/PricingSection";
import { TestimonialsSection } from "@/modules/landing-app/TestimonialSection";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const translations = await serverSideTranslations(locale || 'pl', [
    'landing', 'landing-app'
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const ScoutingAppPage = () => {
  const { t } = useTranslation()
  const heroDataTrans = heroData(t)
  const copyDataTrans = copyData(t)
  const advantagesTrans = advantages(t)
  const testimonialsTrans = testimonials(t)

  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroDataTrans} />
        <CopySection {...copyDataTrans} />
        <FunctionalitySection />
        <AdvantagesSection advantages={advantagesTrans} dark />
        <TestimonialsSection testimonials={testimonialsTrans} />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
};

export default ScoutingAppPage
