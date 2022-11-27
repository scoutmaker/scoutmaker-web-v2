import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps } from '@/types/tables'

import { TeamAffiliationDto, TeamAffiliationsSortBy } from '../types'
import { TeamAffiliationsTableRow } from './row'

interface ITeamAffiliationsTableProps extends ICommonTableProps {
  data: TeamAffiliationDto[]
  handleDeleteItemClick?: (data: { id: string }) => void
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
  data,
  shouldDisplayPlayerName,
  handleDeleteItemClick,
}: ITeamAffiliationsTableProps) => {
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
      headCells={generateHeadCells({ t, shouldDisplayPlayerName })}
      actions={actions}
    >
      {data.map(affiliation => (
        <TeamAffiliationsTableRow
          key={affiliation.id}
          data={affiliation}
          onEditClick={() =>
            router.push(`/team-affiliations/edit/${affiliation.id}`)
          }
          onDeleteClick={
            handleDeleteItemClick
              ? () => handleDeleteItemClick({ id: affiliation.id })
              : undefined
          }
          actions={actions}
          shouldDisplayPlayerName={shouldDisplayPlayerName}
        />
      ))}
    </Table>
  )
}
