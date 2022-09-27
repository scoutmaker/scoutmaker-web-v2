import { CssBaseline } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

import { AdvantagesSection } from '@/components/landing/AdvantagesSection'
import { ContactFormModal } from '@/components/landing/ContactFormModal'
import { CopySection } from '@/components/landing/CopySection'
import { EffectsSection } from '@/components/landing/EffectsSection'
import { Footer } from '@/components/landing/Footer'
import HeroSection from '@/components/landing/HeroSection'
import { ValuesSection } from '@/components/landing/ValuesSection'
import {
  advantages,
  copyData,
  effects,
  heroData,
  values,
} from '@/modules/landing-academy/data'
import { PricingSection } from '@/modules/landing-academy/PricingSection'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const translations = await serverSideTranslations(locale || 'pl', [
    'landing',
    'landing-academy',
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const ScoutingAcademyPage = () => {
  const [isContactFormModalOpen, setIsContactFormModalOpen] = useState(false)
  const { t } = useTranslation()
  const heroDataTrans = heroData(t)
  const copyDataTrans = copyData(t)
  const valuesTrans = values(t)
  const advantagesTrans = advantages(t)
  const effectsTrans = effects(t)

  return (
    <>
      <main>
        <CssBaseline />
        <HeroSection {...heroDataTrans} />
        <CopySection {...copyDataTrans} />
        <ValuesSection values={valuesTrans} />
        <AdvantagesSection advantages={advantagesTrans} dark />
        <EffectsSection
          title={t('landing-academy:TRUSTED_US')}
          effects={effectsTrans}
        />
        <PricingSection onButtonClick={() => setIsContactFormModalOpen(true)} />
        <ContactFormModal
          open={isContactFormModalOpen}
          onClose={() => setIsContactFormModalOpen(false)}
        />
      </main>
      <Footer />
    </>
  )
}

export default ScoutingAcademyPage
