import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { TeamDto } from '../types'
import { TeamsTableRow } from './teams-row'

interface ITeamsTableProps extends ICommonTableProps {
  data: TeamDto[]
  handleDeleteItemClick?: (data: INameToDeleteData) => void
  onLikeClick: (id: string) => void
  onUnLikeClick: (id: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'favourite', label: '' },
    { id: 'name', label: t('NAME') },
    { id: 'clubId', label: t('CLUB') },
    {
      id: 'competition_with_group',
      label: `${t('COMPETITION')} → ${t('GROUP')}`,
      isSortingDisabled: true,
    },
  ]
}

export const TeamsTable = ({
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
  onLikeClick,
  onUnLikeClick,
}: ITeamsTableProps) => {
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
      headCells={generateHeadCells(t)}
      actions={actions}
    >
      {data.map(team => (
        <TeamsTableRow
          key={team.id}
          data={team}
          onEditClick={() => {
            router.push(`/teams/edit/${team.slug}`)
          }}
          onDeleteClick={() =>
            handleDeleteItemClick
              ? handleDeleteItemClick({ id: team.id, name: team.name })
              : undefined
          }
          onLikeClick={onLikeClick}
          onUnlikeClick={onUnLikeClick}
          actions={actions}
        />
      ))}
    </Table>
  )
}
