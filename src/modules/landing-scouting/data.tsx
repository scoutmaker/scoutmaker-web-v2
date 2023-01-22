import {
  AccessTime as TimeIcon,
  Assessment as ReportsIcon,
  Check as RecommendationsIcon,
  DoubleArrow as ScoutingIcon,
  Money as MoneyIcon,
  Note as NotesIcon,
  Storage as DatabaseIcon,
} from '@mui/icons-material'
import { StaticImageData } from 'next/image'
import { TFunction } from 'next-i18next'

import bytomLogo from '@/assets/bytom-logo.png'
import lubinLogo from '@/assets/lubin-logo.png'
import nielbaLogo from '@/assets/nielba-logo.png'
import odraLogo from '@/assets/odra-logo.png'
import phoneMockup from '@/assets/phone1.png'
import phoneMenuMockup from '@/assets/phone2.png'
import podhaleLogo from '@/assets/podhale-logo.png'
import polkowiceLogo from '@/assets/polkowice-logo.png'
import backgroundImage from '@/assets/scouting-background.png'
import sypekPhoto from '@/assets/sypek-photo.jpg'
import szmytPhoto from '@/assets/szmyt-photo.jpg'
import tkoczPhoto from '@/assets/tkocz-photo.png'
import zakPhoto from '@/assets/zak-photo.png'
import { Advantage, Value } from '@/components/landing/types'

export const heroData = (t: TFunction) => ({
  backgroundImage: backgroundImage.src,
  image: {
    img: phoneMockup,
    alt: 'App dashboard view',
  },
  title: (
    <>
      Scout<em>Maker</em>.pro
    </>
  ),
  features: [
    t('landing-scouting:HERO_FEATURE1'),
    t('landing-scouting:HERO_FEATURE2'),
    t('landing-scouting:HERO_FEATURE3'),
  ],
})

export const copyData = (t: TFunction) => {
  const txt = t('landing-scouting:COPY_TEXT').split('{{em}}')

  return {
    title: (
      <>
        {t('landing-scouting:COPY_TITLE_START')} Scout<em>Maker</em>.Pro
      </>
    ),
    text: (
      <>
        {txt[0]}
        <em>{txt[1]}</em>
        {txt[2]}
      </>
    ),
    image: {
      img: phoneMenuMockup,
      alt: 'App with menu open view',
    },
  }
}

export const values = (t: TFunction): Value[] => [
  {
    number: '01',
    title: t('landing-scouting:VALUES_DATA_TITLE'),
    icon: <DatabaseIcon />,
    values: [
      t('landing-scouting:VALUES_DATA1'),
      t('landing-scouting:VALUES_DATA2'),
      t('landing-scouting:VALUES_DATA3'),
    ],
    link: 'https://docs.google.com/spreadsheets/d/1zmP7uwEdXgTcHyAM0kLqZJzwHhRkXtpI/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    number: '02',
    title: t('landing-scouting:VALUES_NOTES_TITLE'),
    icon: <NotesIcon />,
    values: [
      t('landing-scouting:VALUES_NOTES1'),
      t('landing-scouting:VALUES_NOTES2'),
    ],
    link: 'https://drive.google.com/file/d/1c7Clw9Q3_HTFJHml7QNTfroMTGi3imwu/view?usp=sharing',
  },
  {
    number: '03',
    title: t('landing-scouting:VALUES_REPORTS_TITLE'),
    icon: <ReportsIcon />,
    values: [
      t('landing-scouting:VALUES_REPORTS1'),
      t('landing-scouting:VALUES_REPORTS2'),
      t('landing-scouting:VALUES_REPORTS3'),
    ],
    link: 'https://drive.google.com/file/d/1KzkA-VticPoDlzuqpCVRGC-q7wos8T68/view?usp=sharing',
  },
  {
    number: '04',
    title: t('landing-scouting:VALUES_RECOMMENDATIONS_TITLE'),
    icon: <RecommendationsIcon />,
    values: [
      t('landing-scouting:VALUES_RECOMMENDATIONS1'),
      t('landing-scouting:VALUES_RECOMMENDATIONS2'),
    ],
    link: 'https://drive.google.com/file/d/1MbPfmxE8g0CTpieYb1Z0d99YwhNAkeCq/view?usp=sharing',
  },
]

export const advantages = (t: TFunction): Advantage[] => [
  {
    title: t('landing-scouting:ADVANTAGE_TIME_TITLE'),
    icon: <TimeIcon color="inherit" />,
    text: t('landing-scouting:ADVANTAGE_TIME_TEXT'),
  },
  {
    title: t('landing-scouting:ADVANTAGE_MONEY_TITLE'),
    icon: <MoneyIcon color="inherit" />,
    text: t('landing-scouting:ADVANTAGE_MONEY_TEXT'),
  },
  {
    title: t('landing-scouting:ADVANTAGE_DATABASE_TITLE'),
    icon: <DatabaseIcon color="inherit" />,
    text: t('landing-scouting:ADVANTAGE_DATABASE_TEXT'),
  },
  {
    title: t('landing-scouting:ADVANTAGE_SCOUTING_TITLE'),
    icon: <ScoutingIcon color="inherit" />,
    text: t('landing-scouting:ADVANTAGE_SCOUTING_TEXT'),
  },
]

type ClubData = {
  name: string
  logo: StaticImageData
}

export type Transfer = {
  player: {
    name: string
    image: StaticImageData
  }
  from: ClubData
  to: ClubData
  reportLink: string
}

export const transfers: Transfer[] = [
  {
    player: {
      name: 'Adam Żak',
      image: zakPhoto,
    },
    from: {
      name: 'Polonia Bytom',
      logo: bytomLogo,
    },
    to: {
      name: 'Odra Opole',
      logo: odraLogo,
    },
    reportLink:
      'https://drive.google.com/file/d/1IsRkdUEYIBXvt6zCjn_kmafVafUC49s_/view?usp=sharing',
  },
  {
    player: {
      name: 'Maksymilian Tkocz',
      image: tkoczPhoto,
    },
    from: {
      name: 'Podhale Nowy Targ',
      logo: podhaleLogo,
    },
    to: {
      name: 'Odra Opole',
      logo: odraLogo,
    },
    reportLink:
      'https://drive.google.com/file/d/1k161cG--8hZaMNO2qf7bfUMDsQmI3UNi/view?usp=sharing',
  },
  {
    player: {
      name: 'Kajetan Szmyt',
      image: szmytPhoto,
    },
    from: {
      name: 'Nielba Wągrowiec',
      logo: nielbaLogo,
    },
    to: {
      name: 'Górnik Polkowice',
      logo: polkowiceLogo,
    },
    reportLink:
      'https://drive.google.com/file/d/1Z9uArxzOJ2_T02K3Zc7Rk7mR82qT8keV/view?usp=sharing',
  },
  {
    player: {
      name: 'Jakub Sypek',
      image: sypekPhoto,
    },
    from: {
      name: 'Zagłębie II Lubin',
      logo: lubinLogo,
    },
    to: {
      name: 'Górnik Polkowice',
      logo: polkowiceLogo,
    },
    reportLink:
      'https://drive.google.com/file/d/1pX2hTw-QO9BPJRpSONQjRU7sEYdET9iL/view?usp=sharing',
  },
]

export type Recommendation = {
  player: string
  from: string
  to: string
  reportLink: string
}

export const recommendations: Recommendation[] = [
  {
    player: 'Mateusz Łęgowski',
    from: 'Pogoń II Szczecin',
    to: 'Pogoń Szczecin',
    reportLink:
      'https://drive.google.com/file/d/1P7NWJhQYm2UYbe6GaKOBt4MSKEzFX4Qk/view?usp=sharing',
  },
  {
    player: 'Kacper Karasek',
    from: 'Unia Skierniewice',
    to: 'Widzew Łódź',
    reportLink:
      'https://drive.google.com/file/d/11bgNRXMaWDE4rBm0SupATcAaiGgEAPcy/view?usp=sharing',
  },
  {
    player: 'Szymon Szymański',
    from: 'Rekord Bielsko-Biała',
    to: 'Skra Częstochowa',
    reportLink:
      'https://drive.google.com/file/d/1xoSWT_0LXuoDkXJ_NyBcKl0r-DBo-kes/view?usp=sharing',
  },
  {
    player: 'Andrzej Trubeha',
    from: 'Legionovia Legionowo',
    to: 'Jagiellonia Białystok',
    reportLink:
      'https://drive.google.com/file/d/1-X62MjyYVvhC3HNDWgYDliGe0bTIuL5A/view?usp=sharing',
  },
  {
    player: 'Filip Arak',
    from: 'Błonianka Błonie',
    to: 'Skra Częstochowa',
    reportLink:
      'https://drive.google.com/file/d/1JVxPr-KTjdX9jMBTYBWLjTQu5jOceSiW/view?usp=sharing',
  },
  {
    player: 'Bartosz Baranowicz',
    from: 'Górnik II Zabrze',
    to: 'Skra Częstochowa',
    reportLink:
      'https://drive.google.com/file/d/1e2UkW4DgFzWROx_AoK2xHMUPwJpjg4Qo/view?usp=sharing',
  },
]

export const databaseAccessPricing = (t: TFunction) => ({
  title: 'Dostęp do bazy',
  features: [
    { title: t('landing-scouting:PRICING_ANALYSIS'), value: true },
    { title: t('landing-scouting:PRICING_CUSTOM_TEMPLATE'), value: true },
    { title: t('landing-scouting:PRICING_APP_ACCESS'), value: true },
    { title: t('landing-scouting:PRICING_BUILD_DATABASE'), value: true },
    { title: t('landing-scouting:PRICING_DATABASE_ACCESS'), value: true },
  ],
})

export const orderScoutingPricing = (t: TFunction) => ({
  title: 'Skauting na zlecenie',
  features: [
    { title: t('landing-scouting:PRICING_ANALYSIS'), value: true },
    { title: t('landing-scouting:PRICING_CUSTOM_TEMPLATE'), value: true },
    { title: t('landing-scouting:PRICING_APP_ACCESS'), value: true },
    { title: t('landing-scouting:PRICING_BUILD_DATABASE'), value: true },
    { title: t('landing-scouting:PRICING_DATABASE_ACCESS'), value: true },
    { title: t('landing-scouting:PRICING_OBSERVATIONS'), value: true },
    { title: t('landing-scouting:PRICING_SCOUTS'), value: true },
    { title: t('landing-scouting:PRICING_RECOMENDATIONS'), value: true },
    {
      title: t('landing-scouting:PRICING_OBSERVATION_REGIONS'),
      value: true,
    },
  ],
})

export const directorScoutingPricing = (t: TFunction) => ({
  title: 'Dyrektor Skautingu',
  features: [
    { title: t('landing-scouting:PRICING_ANALYSIS'), value: true },
    { title: t('landing-scouting:PRICING_CUSTOM_TEMPLATE'), value: true },
    { title: t('landing-scouting:PRICING_APP_ACCESS'), value: true },
    { title: t('landing-scouting:PRICING_BUILD_DATABASE'), value: true },
    { title: t('landing-scouting:PRICING_DATABASE_ACCESS'), value: true },
    { title: t('landing-scouting:PRICING_OBSERVATIONS'), value: true },
    { title: t('landing-scouting:PRICING_SCOUTS'), value: true },
    { title: t('landing-scouting:PRICING_RECOMENDATIONS'), value: true },
    {
      title: t('landing-scouting:PRICING_OBSERVATION_REGIONS'),
      value: true,
    },
    {
      title: t('landing-scouting:PRICING_OBSERVATION_REGIONS'),
      value: true,
    },
    {
      title: t('landing-scouting:PRICING_VERIFICATION'),
      value: true,
    },
    {
      title: t('landing-scouting:PRICING_PLAYER_CONTACT'),
      value: true,
    },
    {
      title: t('landing-scouting:PRICING_DIRECTOR_CONTACT'),
      value: true,
    },
  ],
})

export const historicalDataPricing = (t: TFunction) => ({
  price: t('landing-scouting:REQUEST_PRICE'),
  features: [
    { title: t('landing-scouting:HISTORICAL_19_20'), value: true },
    { title: t('landing-scouting:HISTORICAL_20_21'), value: true },
  ],
})
