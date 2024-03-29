import { CssBaseline } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AdvantagesSection } from '@/components/landing/AdvantagesSection'
import { ContactForm } from '@/components/landing/ContactForm'
import { CopySection } from '@/components/landing/CopySection'
import { Footer } from '@/components/landing/Footer'
import HeroSection from '@/components/landing/HeroSection'
import { ValuesSection } from '@/components/landing/ValuesSection'
import {
  advantages,
  copyData,
  heroData,
  values,
} from '@/modules/landing-scouting/data'
import { PricingSection } from '@/modules/landing-scouting/PricingSection'
import { RecommendationsSection } from '@/modules/landing-scouting/RecomendationsSection'
import { TransfersSection } from '@/modules/landing-scouting/TransfersSection'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const translations = await serverSideTranslations(locale || 'pl', [
    'landing',
    'common',
    'landing-scouting',
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const ClubScoutingPage = () => {
  const { t } = useTranslation()

  const heroDataTranslated = heroData(t)
  const copyDataTranslated = copyData(t)
  const valuesTranslated = values(t)
  const advantagesTranslated = advantages(t)

  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection
          {...heroDataTranslated}
          displayAppNumbers
          letsMeetVariant
        />
        <CopySection {...copyDataTranslated} goToSection="#advantages" />
        <ValuesSection values={valuesTranslated} />

        <TransfersSection />
        <RecommendationsSection goToSection="#contactform" />
        <AdvantagesSection advantages={advantagesTranslated} />
        <PricingSection />
        <ContactForm
          title="Porozmawiajmy o skautingu w Twoim klubie"
          emailTopic="Skauting obserwacyjny"
        />
      </main>
      <Footer />
    </>
  )
}

export default ClubScoutingPage
