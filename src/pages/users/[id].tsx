import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { UserDetailsCard } from '@/modules/users/details-card'
import { UserDto } from '@/modules/users/types'
import { getUserById } from '@/services/api/methods/users'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserDto>(['common', 'users'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserById(
        +(params?.id as string),
        token,
      )
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError
      }
    }
  });

const UserPage = ({ data, errorMessage, errorStatus }: TSsrRole<UserDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('USER')} />
      <UserDetailsCard user={data} />
    </>
  )
}

export default UserPage
