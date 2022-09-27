import {
  AccessTime as TimeIcon,
  Assessment as ReportsIcon,
  Check as FeedbackIcon,
  Money as MoneyIcon,
  Search as ScoutingIcon,
  Storage as DatabaseIcon,
} from '@mui/icons-material';
import { TFunction } from 'next-i18next';

import backgroundImage from '@/assets/academy-background.png';
import bytomLogo from '@/assets/bytom-logo.png';
import chemikLogo from '@/assets/chemik-logo.png';
import jantarLogo from '@/assets/jantar-logo.png';
import phoneMockup from '@/assets/phone1.png';
import phoneMenuMockup from '@/assets/phone2.png';
import resoviaLogo from '@/assets/resovia-logo.png';
import { Advantage, Effect, Value } from '@/components/landing/types';

export const heroData = (t: TFunction) => ({
  backgroundImage: backgroundImage.src,
  image: {
    img: phoneMockup,
    alt: 'App dashboard view',
  },
  title: (
    <p>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <>
        Scout<em>Maker</em>.pro {t('landing-academy:ACADEMY')}
      </>
    </p>
  ),
  features: [
    t('landing-academy:HERO_FEATURE1'),
    t('landing-academy:HERO_FEATURE2'),
    t('landing-academy:HERO_FEATURE3'),
  ],
});

export const copyData = (t: TFunction) => ({
  title: (
    <>
      {t('landing-academy:ACADEMY')} Scout<em>Maker</em>.Pro
    </>
  ),
  text: t('landing-academy:COPY_TEXT'),
  image: {
    img: phoneMenuMockup,
    alt: 'App with menu open view',
  },
});

export const values = (t: TFunction): Value[] => [
  {
    number: '01',
    title: t('landing-academy:VALUE_DATA_TITLE'),
    icon: <DatabaseIcon />,
    values: [
      t('landing-academy:VALUE_DATA1'),
      t('landing-academy:VALUE_DATA2'),
      t('landing-academy:VALUE_DATA3'),
    ],
    link: '',
  },
  {
    number: '02',
    title: t('landing-academy:VALUE_SCOUTING_TITLE'),
    icon: <ScoutingIcon />,
    values: [
      t('landing-academy:VALUE_SCOUTING1'),
      t('landing-academy:VALUE_SCOUTING2'),
      t('landing-academy:VALUE_SCOUTING3'),
    ],
    link: '',
  },
  {
    number: '03',
    title: t('landing-academy:VALUE_RECRUITMENT_TITLE'),
    icon: <ReportsIcon />,
    values: [
      t('landing-academy:VALUE_RECRUITMENT1'),
      t('landing-academy:VALUE_RECRUITMENT2'),
      t('landing-academy:VALUE_RECRUITMENT3'),
    ],
    link: '',
  },
  {
    number: '04',
    title: 'Feedback',
    icon: <FeedbackIcon />,
    values: [
      t('landing-academy:VALUE_FEEDBACK1'),
      t('landing-academy:VALUE_FEEDBACK2')
    ],
    link: '',
  },
];

export const advantages = (t: TFunction): Advantage[] => [
  {
    title: t('landing-academy:ADVANTAGE_TIME_TITLE'),
    icon: <TimeIcon color="inherit" />,
    text: t('landing-academy:ADVANTAGE_TIME_TEXT'),
  },
  {
    title: t('landing-academy:ADVANTAGE_MONEY_TITLE'),
    icon: <MoneyIcon color="inherit" />,
    text: t('landing-academy:ADVANTAGE_MONEY_TEXT'),
  },
  {
    title: t('landing-academy:ADVANTAGE_DATA_TITLE'),
    icon: <DatabaseIcon color="inherit" />,
    text: t('landing-academy:ADVANTAGE_DATA_TEXT'),
  },
  {
    title: t('landing-academy:ADVANTAGE_ESCOUTING_TITLE'),
    icon: <ScoutingIcon color="inherit" />,
    text: t('landing-academy:ADVANTAGE_ESCOUTING_TEXT'),
  },
];

export const effects = (t: TFunction): Effect[] => [
  {
    logo: bytomLogo,
    name: 'Polonia Bytom',
    text: t('landing-academy:EFFECT_POLONIA_TEXT'),
    link: '',
  },
  {
    logo: resoviaLogo,
    name: 'Resovia Rzeszów',
    text: t('landing-academy:EFFECT_RESOVIA_TEXT'),
    link:
      'https://docs.google.com/spreadsheets/d/1eUvPMT_4a6CHo661ZyoS3VJYRWRJr2fu/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    logo: jantarLogo,
    name: 'Jantar Ustka',
    text: t('landing-academy:EFFECT_JANTAR_TEXT'),
    link:
      'https://docs.google.com/spreadsheets/d/1LxromvMx1iISMBRqv_eQrcgpEfGBAxBR/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    logo: chemikLogo,
    name: 'Chemik Bydgoszcz',
    text: t('landing-academy:EFFECT_CHEMIK_TEXT'),
    link: '',
  },
];

export const oneTimeServicePricing = (t: TFunction) => ({
  price: '399 pln',
  features: [
    { title: t('landing-academy:PRICE_ONETIME'), value: true },
    { title: t('landing-academy:PRICE_DATA'), value: true },
    { title: t('landing-academy:PRICE_RECOMMENDATIONS'), value: true },
    { title: t('landing-academy:PRICE_OBSERVATIONS'), value: false },
    { title: t('landing-academy:PRICE_SUPPORT'), value: false },
    { title: t('landing-academy:PRICE_ENEMY_STATISTICS'), value: false },
    { title: t('landing-academy:PRICE_COOPERATION'), value: true },
    { title: t('landing-academy:PRICE_ALL_COMPETITIONS'), value: true },
  ],
});

export const constantCooperationPricing = (t: TFunction) => ({
  price: '199 pln/miesiąc',
  features: [
    { title: t('landing-academy:PRICE_CONSTANT'), value: true },
    { title: t('landing-academy:PRICE_DATA'), value: true },
    { title: t('landing-academy:PRICE_RECOMMENDATIONS'), value: true },
    { title: t('landing-academy:PRICE_OBSERVATIONS'), value: true },
    { title: t('landing-academy:PRICE_SUPPORT'), value: true },
    { title: t('landing-academy:PRICE_ENEMY_STATISTICS'), value: true },
    { title: t('landing-academy:PRICE_COOPERATION'), value: true },
    { title: t('landing-academy:PRICE_ALL_COMPETITIONS'), value: true },
  ],
});