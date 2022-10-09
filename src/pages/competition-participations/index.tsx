import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { CompetitionParticipationsFilterForm } from '@/modules/competition-participations/forms/filter'
import {
  useCompetitionParticipations,
  useDeleteCompetitionParticipation,
} from '@/modules/competition-participations/hooks'
import { CompetitionParticipationsTable } from '@/modules/competition-participations/table/table'
import {
  CompetitionParticipationsFilterDto,
  CompetitionParticipationsSortBy,
} from '@/modules/competition-participations/types'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: CompetitionParticipationsFilterDto = {
  competitionId: '',
  groupId: '',
  seasonId: '',
  teamId: '',
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'comp-participations'],
  ['ADMIN'],
)

interface IToDeleteData {
  id: string
}

const CompetitionParticipationsPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<IToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('compParticipationsTable')

  const [filters, setFilters] =
    useLocalStorage<CompetitionParticipationsFilterDto>({
      key: 'comp-participations-filters',
      initialValue: initialFilters,
    })

  function handleSetFilters(newFilters: CompetitionParticipationsFilterDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: compParticipations, isLoading: dataLoading } =
    useCompetitionParticipations({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as CompetitionParticipationsSortBy,
      sortingOrder: order,
      ...filters,
    })

  const { mutate: deleteCompParticipation, isLoading: deleteLoading } =
    useDeleteCompetitionParticipation()

  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()
  const { data: competitionsData, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: seasonsData, isLoading: seasonsLoading } = useSeasonsList()
  const { data: groupsData, isLoading: groupsLoading } =
    useCompetitionGroupsList()

  const handleDeleteItemClick = (data: IToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading ||
    deleteLoading ||
    teamsLoading ||
    competitionsLoading ||
    seasonsLoading ||
    groupsLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('comp-participations:INDEX_PAGE_TITLE')} />
      <CompetitionParticipationsFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
        competitionsData={competitionsData || []}
        groupsData={groupsData || []}
        seasonsData={seasonsData || []}
        teamsData={teamsData || []}
      />
      <CompetitionParticipationsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={compParticipations?.totalDocs || 0}
        actions
        shouldDisplayTeamName
        data={compParticipations?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/competition-participations/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('comp-participations:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteCompParticipation(toDeleteData.id)

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

export default CompetitionParticipationsPage
