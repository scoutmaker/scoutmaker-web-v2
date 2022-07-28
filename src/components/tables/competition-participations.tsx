import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { Table } from '@/components/tables/common/table'
import { CompetitionParticipationsSortBy } from '@/modules/competition-participations/types'
import { ICommonTableProps } from '@/types/tables'

interface ICompetitionParticipationsTableProps extends ICommonTableProps {
  children: ReactNode
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
  children,
  shouldDisplayTeamName,
}: ICompetitionParticipationsTableProps) => {
  const { t } = useTranslation()

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
      {children}
    </Table>
  )
}
