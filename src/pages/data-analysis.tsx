import { CssBaseline } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AdvantagesSection } from '@/components/landing/AdvantagesSection'
import { ContactForm } from '@/components/landing/ContactForm'
import { EffectsSection } from '@/components/landing/EffectsSection'
import { Footer } from '@/components/landing/Footer'
import DataAnalysisHeroSection from '@/components/landing/HeroSection/data-analysis'
import { advantages, effects, heroData } from '@/modules/landing-data/data'
import { HowDoWeWorkSection } from '@/modules/landing-data/HowDoWeWorkSection'
import { UseOurHelpSection } from '@/modules/landing-data/UseOurHelpSection'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const translations = await serverSideTranslations(locale || 'pl', [
    'landing',
    'common',
    'landing-data',
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const DataAnalysisPage = () => {
  const { t } = useTranslation()
  const heroDataTrans = heroData(t)
  const advantagesDataTrans = advantages(t)
  const effectsDataTrans = effects(t)

  return (
    <>
      <main>
        <CssBaseline />
        <DataAnalysisHeroSection {...heroDataTrans} />
        {/* <CopySection {...copyDataTrans} /> */}
        <UseOurHelpSection />
        <EffectsSection
          effects={effectsDataTrans}
          title={t('landing-data:DATA_ANALYSIS_EXAMPLES')}
        />
        <HowDoWeWorkSection />
        <AdvantagesSection advantages={advantagesDataTrans} />
        {/* <PricingSection onButtonClick={() => setIsContactFormModalOpen(true)} /> */}
        <ContactForm title="Porozmawiajmy o analizie danych w Twoim klubie" />
      </main>
      <Footer />
    </>
  )
}

export default DataAnalysisPage
