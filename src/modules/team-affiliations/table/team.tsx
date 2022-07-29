import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { Table } from '@/components/tables/table'
import { ICommonTableProps } from '@/types/tables'

import { TeamAffiliationsSortBy } from '../types'

interface ITeamAffiliationsTableProps extends ICommonTableProps {
  children: ReactNode
  shouldDisplayPlayerName?: boolean
}

interface IHeadCell {
  id: TeamAffiliationsSortBy
  label: string
}

interface IGenerateHeadCellsArgs {
  t: TFunction
  shouldDisplayPlayerName?: boolean
}

function generateHeadCells({
  t,
  shouldDisplayPlayerName,
}: IGenerateHeadCellsArgs): IHeadCell[] {
  const commonHeadCells: IHeadCell[] = [
    { id: 'teamId', label: t('TEAM') },
    { id: 'startDate', label: t('START_DATE') },
    { id: 'endDate', label: t('END_DATE') },
  ]

  if (shouldDisplayPlayerName) {
    return [{ id: 'playerId', label: t('PLAYER') }, ...commonHeadCells]
  }

  return commonHeadCells
}

export const TeamAffiliationsTable = ({
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
  shouldDisplayPlayerName,
}: ITeamAffiliationsTableProps) => {
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
      headCells={generateHeadCells({ t, shouldDisplayPlayerName })}
      actions={actions}
    >
      {children}
    </Table>
  )
}
