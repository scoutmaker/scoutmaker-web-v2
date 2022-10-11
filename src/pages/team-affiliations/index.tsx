import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { usePlayersList } from '@/modules/players/hooks'
import { TeamAffiliationFilterForm } from '@/modules/team-affiliations/forms/filter'
import {
  useDeleteTeamAffiliation,
  useTeamAffiliations,
} from '@/modules/team-affiliations/hooks'
import { TeamAffiliationsTable } from '@/modules/team-affiliations/table/team'
import {
  TeamAffiliationsFilterDto,
  TeamAffiliationsSortBy,
} from '@/modules/team-affiliations/types'
import { useTeamsList } from '@/modules/teams/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: TeamAffiliationsFilterDto = {
  playerId: '',
  teamId: '',
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'team-affiliations'],
  ['ADMIN'],
)

interface IToDeleteData {
  id: string
}

const TeamAffiliationsPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<IToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('teamAffiliationsTable')

  const [filters, setFilters] = useLocalStorage<TeamAffiliationsFilterDto>({
    key: 'team-affiliations-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: TeamAffiliationsFilterDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: affiliations, isLoading: dataLoading } = useTeamAffiliations({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as TeamAffiliationsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteTeamAffiliation, isLoading: deleteLoading } =
    useDeleteTeamAffiliation()

  const { data: playersData, isLoading: playersLoading } = usePlayersList()
  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()

  const isLoading =
    dataLoading || deleteLoading || teamsLoading || playersLoading

  const handleDeleteItemClick = (data: { id: string }) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('team-affiliations:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <TeamAffiliationFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          playersData={playersData || []}
          teamsData={teamsData || []}
        />
      </FilterAccordion>
      <TeamAffiliationsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={affiliations?.totalDocs || 0}
        actions
        shouldDisplayPlayerName
        data={affiliations?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/team-affiliations/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('team-affiliations:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteTeamAffiliation(toDeleteData.id)

          setToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default TeamAffiliationsPage
