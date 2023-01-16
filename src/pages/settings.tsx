import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useUpdateUser, useUser } from '@/modules/auth/hooks'
import { useReportBgImagesList } from '@/modules/report-background-images/hooks'
import { useReportTemplatesList } from '@/modules/report-templates/hooks'
import { SettingsFormForm } from '@/modules/settings/forms/settings'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'settings'],
  false,
)

const SettingsPage = () => {
  const { t } = useTranslation()

  const reportTemplates = useReportTemplatesList()
  const reportBackgroundImages = useReportBgImagesList()

  const { mutate: updateUser, isLoading: updateUserLoading } = useUpdateUser()
  const user = useUser()

  const isLoading =
    reportTemplates.isLoading ||
    reportBackgroundImages.isLoading ||
    updateUserLoading ||
    user.isLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('settings:INDEX_PAGE_TITLE')} />
      <SettingsFormForm
        onSubmit={data => updateUser(data)}
        reportBackgroundImagesData={reportBackgroundImages.data || []}
        reportTemplatesData={reportTemplates.data || []}
        user={user?.data}
      />
    </>
  )
}

export default SettingsPage
