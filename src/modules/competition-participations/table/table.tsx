import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import {
  CompetitionParticipationDto,
  CompetitionParticipationsSortBy,
} from '@/modules/competition-participations/types'
import { ICommonTableProps } from '@/types/tables'

import { CompetitionParticipationsTableRow } from './row'

interface ICompetitionParticipationsTableProps extends ICommonTableProps {
  data: CompetitionParticipationDto[]
  handleDeleteItemClick?: (data: { id: string }) => void
  shouldDisplayTeamName?: boolean
}

interface IHeadCell {
  id: CompetitionParticipationsSortBy
  label: string
}

interface IGenerateHeadCellsArgs {
  t: TFunction
  shouldDisplayTeamName?: boolean
}

function generateHeadCells({
  t,
  shouldDisplayTeamName,
}: IGenerateHeadCellsArgs): IHeadCell[] {
  const commonHeadCells: IHeadCell[] = [
    { id: 'seasonId', label: t('SEASON') },
    { id: 'competitionId', label: t('COMPETITION') },
    { id: 'groupId', label: t('COMPETITION_GROUP') },
  ]

  if (shouldDisplayTeamName) {
    return [{ id: 'teamId', label: t('TEAM') }, ...commonHeadCells]
  }

  return commonHeadCells
}

export const CompetitionParticipationsTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  total,
  actions,
  data,
  handleDeleteItemClick,
  shouldDisplayTeamName,
}: ICompetitionParticipationsTableProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Table
      page={page}
      rowsPerPage={rowsPerPage}
      sortBy={sortBy}
      order={order}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleSort={handleSort}
      total={total}
      headCells={generateHeadCells({ t, shouldDisplayTeamName })}
      actions={actions}
    >
      {data.map(participation => (
        <CompetitionParticipationsTableRow
          key={participation.id}
          data={participation}
          onEditClick={() =>
            router.push(`/competition-participations/edit/${participation.id}`)
          }
          onDeleteClick={
            handleDeleteItemClick
              ? () => handleDeleteItemClick({ id: participation.id })
              : undefined
          }
          shouldDisplayTeamName={shouldDisplayTeamName}
          actions={actions}
        />
      ))}
    </Table>
  )
}
