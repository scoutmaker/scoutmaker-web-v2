import {
  AccessTime as TimeIcon,
  DoubleArrow as ScoutingIcon,
  Money as MoneyIcon,
  Storage as DatabaseIcon,
} from '@mui/icons-material'
import { TFunction } from 'next-i18next'

import neptunLogo from '@/assets/neptun-logo.png'
import odraLogo from '@/assets/odra-logo.png'
import phoneMockup from '@/assets/phone1.png'
import phoneMenuMockup from '@/assets/phone2.png'
import resoviaLogo from '@/assets/resovia-logo.png'
import backgroundImage from '@/assets/scouting-background.png'
import skierniewiceLogo from '@/assets/skierniewice-logo.png'
import { Advantage, Effect } from '@/components/landing/types'

export const heroData = (t: TFunction) => ({
  backgroundImage: backgroundImage.src,
  image: {
    img: phoneMockup,
    alt: 'App dashboard view',
  },
  title: (
    <>
      Scout<em>Maker</em>.pro {t('landing-data:HERO_TITLE_END')}
    </>
  ),
  features: [
    t('landing-data:HERO_FEATURE1'),
    t('landing-data:HERO_FEATURE2'),
    t('landing-data:HERO_FEATURE3'),
  ],
})

export const copyData = (t: TFunction) => ({
  title: (
    <>
      {t('landing-data:COPY_TITLE_START')} Scout<em>Maker</em>.Pro
    </>
  ),
  text: t('landing-data:COPY_TEXT'),
  image: {
    img: phoneMenuMockup,
    alt: 'App with menu open view',
  },
})

export const advantages = (t: TFunction): Advantage[] => [
  {
    title: t('landing-data:ADVANTAGE_TIME_TITLE'),
    icon: <TimeIcon color="inherit" />,
    text: t('landing-data:ADVANTAGE_TIME_TEXT'),
  },
  {
    title: t('landing-data:ADVANTAGE_MONEY_TITLE'),
    icon: <MoneyIcon color="inherit" />,
    text: t('landing-data:ADVANTAGE_MONEY_TEXT'),
  },
  {
    title: t('landing-data:ADVANTAGE_DATABASE_TITLE'),
    icon: <DatabaseIcon color="inherit" />,
    text: t('landing-data:ADVANTAGE_DATABASE_TEXT'),
  },
  {
    title: t('landing-data:ADVANTAGE_TRANSFERS_TITLE'),
    icon: <ScoutingIcon color="inherit" />,
    text: t('landing-data:ADVANTAGE_TRANSFERS_TEXT'),
  },
]

export const effects = (t: TFunction): Effect[] => [
  {
    logo: neptunLogo,
    name: 'Neptun Końskie',
    text: t('landing-data:EFFECT_NEPTUN_TEXT'),
    link: 'https://docs.google.com/spreadsheets/d/1j3F5USvi03odeJqZFQ-M8FCzxLfE42P5/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    logo: resoviaLogo,
    name: 'Resovia Rzeszów',
    text: t('landing-data:EFFECT_RESOVIA_TEXT'),
    link: 'https://docs.google.com/spreadsheets/d/1eUvPMT_4a6CHo661ZyoS3VJYRWRJr2fu/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    logo: skierniewiceLogo,
    name: 'Widok Skierniewice',
    text: t('landing-data:EFFECT_WIDOK_TEXT'),
    link: 'https://docs.google.com/spreadsheets/d/108PchGw8K2GSnQvpT2uzrQgLxFTDsplE/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    logo: odraLogo,
    name: 'Odra Opole',
    text: t('landing-data:EFFECT_ODRA_TEXT'),
    link: 'https://docs.google.com/spreadsheets/d/1U4dWPdJcyUrSLhPs1KEG2yr9rNxarHHD/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
]

export const methodology = (t: TFunction) => [
  {
    number: '01',
    text: t('landing-data:METHODOLOGY1'),
  },
  {
    number: '02',
    text: t('landing-data:METHODOLOGY2'),
  },
  {
    number: '03',
    text: t('landing-data:METHODOLOGY3'),
  },
  {
    number: '04',
    text: t('landing-data:METHODOLOGY4'),
  },
  {
    number: '05',
    text: t('landing-data:METHODOLOGY4'),
  },
]

export const oneTimeServicePricing = (t: TFunction) => ({
  price: '499 pln',
  features: [
    { title: t('landing-data:PRICING_ONE_TIME'), value: true },
    { title: t('landing-data:PRICING_DATABASE'), value: true },
    { title: t('landing-data:PRICING_RECOMENDATION'), value: true },
    { title: t('landing-data:PRICING_CHOICE'), value: true },
    { title: t('landing-data:PRICING_REGIONS'), value: true },
    { title: t('landing-data:PRICING_ALL'), value: true },
  ],
})

export const constantCooperationPricing = (t: TFunction) => ({
  price: `299 pln/${t('landing:MONTH')}`,
  features: [
    { title: t('landing-data:PRICING_CONST'), value: true },
    { title: t('landing-data:PRICING_DATABASE'), value: true },
    { title: t('landing-data:PRICING_RECOMENDATION'), value: true },
    { title: t('landing-data:PRICING_CHOICE'), value: true },
    { title: t('landing-data:PRICING_REGIONS'), value: true },
    { title: t('landing-data:PRICING_ALL'), value: true },
  ],
})
