import { Box, Button } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { TeamAffiliationDetailsCard } from '@/modules/team-affiliations/details-card'
import { useDeleteTeamAffiliation } from '@/modules/team-affiliations/hooks'
import { TeamAffiliationDto } from '@/modules/team-affiliations/types'
import { getTeamAffiliationById } from '@/services/api/methods/team-affiliations'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<TeamAffiliationDto>(
  ['common', 'team-affiliations'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getTeamAffiliationById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const TeamAffiliationPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<TeamAffiliationDto>) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)

  const { mutate: deleteTeamAffiliation, isLoading: deleteLoading } =
    useDeleteTeamAffiliation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {deleteLoading && <Loader />}
      <PageHeading title={t('TEAM_AFFILIATION')} />
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        marginTop={-2.5}
        paddingBottom={2}
      >
        <Link href={`/team-affiliations/edit/${data.id}`} passHref>
          <Button variant="contained" component="a">
            {t('EDIT')}
          </Button>
        </Link>
        <Button
          variant="contained"
          onClick={() => setIsDeleteConfirmationModalOpen(true)}
        >
          {t('DELETE')}
        </Button>
      </Box>
      <TeamAffiliationDetailsCard affiliation={data} />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('team-affiliations:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => deleteTeamAffiliation(data.id)}
        handleClose={() => setIsDeleteConfirmationModalOpen(false)}
      />
    </>
  )
}

export default TeamAffiliationPage
