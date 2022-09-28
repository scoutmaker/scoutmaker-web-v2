import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { ClubDetailsCard } from '@/modules/clubs/details-card'
import { ClubDto } from '@/modules/clubs/types'
import { getClubBySlug } from '@/services/api/methods/clubs'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'


export const getServerSideProps = withSessionSsrRole<ClubDto>(['common', 'clubs'], false,
  async (token, params) => {
    try {
      const data = await getClubBySlug(
        params?.slug as string,
        token
      )
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const ClubPage = ({ data, errorMessage, errorStatus }: TSsrRole<ClubDto>) => {
  if (data) {
    return (
      <>
        <PageHeading title={data.name} />
        <ClubDetailsCard club={data} />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default ClubPage
