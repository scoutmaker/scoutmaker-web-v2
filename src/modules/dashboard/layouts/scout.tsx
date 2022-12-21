import { useTranslation } from 'next-i18next'

import { NotesIcon, PlayersIcon, ReportsIcon } from '@/components/icons'

import { BasicCard } from '../BasicCard'
import BaseDashboardLayout, { IBaseDashboardProps } from './base'

const ScoutDashboardLayout = (props: Omit<IBaseDashboardProps, 'variant'>) => {
  // will come back to this when adding translations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()

  return (
    <>
      <BaseDashboardLayout {...props} variant="scout" />
      <BasicCard
        title="Baza raportów"
        linkTo="/reports"
        icon={<ReportsIcon />}
      />
      <BasicCard title="Baza notatek" linkTo="/notes" icon={<NotesIcon />} />
      <BasicCard
        title="Ulubieni zawodnicy"
        linkTo="/players"
        icon={<PlayersIcon />}
      />
    </>
  )
}

export default ScoutDashboardLayout
