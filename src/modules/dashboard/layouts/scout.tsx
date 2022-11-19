import { useTranslation } from 'next-i18next'

import { NotesIcon, PlayersIcon, ReportsIcon } from '@/components/icons'

import { BasicCard } from '../BasicCard'
import BaseDashboardLayout, { IBaseDashboardProps } from './base'

const ScoutDashboardLayout = (props: IBaseDashboardProps) => {
  const { t } = useTranslation()

  return (
    <>
      <BaseDashboardLayout {...props} />
      <BasicCard title={t('NOTES')} linkTo="/notes" icon={<NotesIcon />} />
      <BasicCard
        title={t('PLAYERS')}
        linkTo="/players"
        icon={<PlayersIcon />}
      />
      <BasicCard
        title={t('REPORTS')}
        linkTo="/reports"
        icon={<ReportsIcon />}
      />
    </>
  )
}

export default ScoutDashboardLayout
