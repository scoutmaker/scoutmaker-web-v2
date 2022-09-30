import {
  Accessibility as IntuitiveIcon,
  AccessTime as TimeIcon,
  PhoneIphone as MobileIcon,
  Storage as DatabaseIcon,
} from '@mui/icons-material'
import { TFunction } from 'next-i18next'

import phoneMockup from '@/assets/phone1.png'
import phoneMenuMockup from '@/assets/phone2.png'
import backgroundImage from '@/assets/scouting-background.png'
import { Advantage } from '@/components/landing/types'

export const heroData = (t: TFunction) => ({
  backgroundImage: backgroundImage.src,
  image: {
    img: phoneMockup,
    alt: 'App dashboard view',
  },
  title: (
    <>
      {t('landing-app:APP')} Scout<em>Maker</em>.pro
    </>
  ),
  features: [
    t('landing-app:HERO_FEATURE1'),
    t('landing-app:HERO_FEATURE2'),
    t('landing-app:HERO_FEATURE3'),
  ],
})

export const copyData = (t: TFunction) => ({
  title: (
    <>
      {t('landing-app:APP')} Scout<em>Maker</em>.pro
    </>
  ),
  text: t('landing-app:COPY_TEXT'),
  image: {
    img: phoneMenuMockup,
    alt: 'App with menu open view',
  },
})

export const functionalities = (t: TFunction) => [
  {
    title: t('landing-app:FUNC_NOTES_TITLE'),
    text: t('landing-app:FUNC_NOTES_TEXT'),
  },
  {
    title: t('landing-app:FUNC_MATCH_TITLE'),
    text: t('landing-app:FUNC_MATCH_TEXT'),
  },
  {
    title: t('landing-app:FUNC_TEMPLATES_TITLE'),
    text: t('landing-app:FUNC_TEMPLATES_TEXT'),
  },
  {
    title: t('landing-app:FUNC_REPORTS_TITLE'),
    text: t('landing-app:FUNC_REPORTS_TEXT'),
  },
  {
    title: t('landing-app:FUNC_SHARING_TITLE'),
    text: t('landing-app:FUNC_SHARING_TEXT'),
  },
  {
    title: t('landing-app:FUNC_DATA_TITLE'),
    text: t('landing-app:FUNC_DATA_TEXT'),
  },
]

export const advantages = (t: TFunction): Advantage[] => [
  {
    title: t('landing-app:ADVANTAGE_TIME_TITLE'),
    icon: <TimeIcon color="inherit" />,
    text: t('landing-app:ADVANTAGE_TIME_TEXT'),
  },
  {
    title: t('landing-app:ADVANTAGE_DATA_TITLE'),
    icon: <DatabaseIcon color="inherit" />,
    text: t('landing-app:ADVANTAGE_DATA_TEXT'),
  },
  {
    title: t('landing-app:ADVANTAGE_INTUITIVE_TITLE'),
    icon: <IntuitiveIcon color="inherit" />,
    text: t('landing-app:ADVANTAGE_INTUITIVE_TEXT'),
  },
  {
    title: t('landing-app:ADVANTAGE_DISPLAY_TITLE'),
    icon: <MobileIcon color="inherit" />,
    text: t('landing-app:ADVANTAGE_DISPLAY_TEXT'),
  },
]

export type Testimonial = {
  name: string
  role: string
  text: string
}

export const testimonials = (t: TFunction): Testimonial[] => [
  {
    name: 'Łukasz Cebula',
    role: t('landing-app:TESTIMONIAL_CEBULA_ROLE'),
    text: t('landing-app:TESTIMONIAL_CEBULA_TEXT'),
  },
  {
    name: 'Rafał Stryczek',
    role: t('landing-app:TESTIMONIAL_STRYCZEK_ROLE'),
    text: t('landing-app:TESTIMONIAL_STRYCZEK_TEXT'),
  },
  {
    name: 'Piotr Stawarczyk',
    role: t('landing-app:TESTIMONIAL_STAWARCZYK_ROLE'),
    text: t('landing-app:TESTIMONIAL_STAWARCZYK_TEXT'),
  },
]

export const variantOnePricing = (t: TFunction) => ({
  price: `29 pln/${t('landing:MONTH')}`,
  features: [
    { title: t('landing-app:PRICING_NOTES'), value: true },
    { title: t('landing-app:PRICING_REPORTS'), value: true },
    { title: t('landing-app:PRICING_SKILLS'), value: true },
    { title: t('landing-app:PRICING_PDF'), value: true },
    { title: t('landing-app:PRICING_QR'), value: true },
    { title: t('landing-app:PRICING_TEMPLATES'), value: false },
    { title: t('landing-app:PRICING_ONE_LICENSE'), value: true },
  ],
})

export const variantTwoPricing = (t: TFunction) => ({
  price: `49 pln/${t('landing:MONTH')}`,
  features: [
    { title: t('landing-app:PRICING_NOTES'), value: true },
    { title: t('landing-app:PRICING_REPORTS'), value: true },
    { title: t('landing-app:PRICING_SKILLS'), value: true },
    { title: t('landing-app:PRICING_PDF'), value: true },
    { title: t('landing-app:PRICING_QR'), value: true },
    { title: t('landing-app:PRICING_TEMPLATES'), value: true },
    { title: t('landing-app:PRICING_UNLIMITED_LICENSE'), value: true },
  ],
})
