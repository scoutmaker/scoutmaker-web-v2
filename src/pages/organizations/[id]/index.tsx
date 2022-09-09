import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { OrganizationDetailsCard } from '@/modules/organizations/details-card'
import { useRemoveMemberOrganization } from '@/modules/organizations/hooks'
import { OrganizationDto } from '@/modules/organizations/types'
import { BasicUsersTableRow } from '@/modules/users/basic-table/row'
import { BasicUsersTable } from '@/modules/users/basic-table/table'
import { getOrganizationById } from '@/services/api/methods/organizations'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<OrganizationDto>(['common', 'organizations'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getOrganizationById(
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

const OrganizationPage = ({ data, errorMessage, errorStatus }: TSsrRole<OrganizationDto>) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { mutate: removeMember, isLoading: removeMemberLoading } = useRemoveMemberOrganization()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {removeMemberLoading && <Loader />}
      <PageHeading title={t('ORGANIZATION')} />
      <OrganizationDetailsCard organization={data} />
      <section>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginY: 3, gap: 1 }} >
          <Typography variant="h3" align="center">
            {t('organizations:USERS_HEADING')}
          </Typography>
          <Button variant='contained' onClick={() => router.push(`/organizations/${data.id}/add-members`)}>{t('organizations:ADD_MEMBERS_BTN')} <AddIcon /></Button>
        </Box>
        <BasicUsersTable
          page={0}
          rowsPerPage={data.members.length}
          sortBy=''
          order='asc'
          handleChangePage={() => { }}
          handleChangeRowsPerPage={() => { }}
          handleSort={() => { }}
          total={data.members.length}
          actions
        >
          {
            data.members.map(member =>
              <BasicUsersTableRow data={member}
                onRemoveFromOrganization={() => removeMember({ memberId: member.id, organizationId: data.id })}
              />)
          }
        </BasicUsersTable>
      </section>
    </>
  )
}

export default OrganizationPage
