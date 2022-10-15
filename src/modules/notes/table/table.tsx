import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { NoteDto } from '../types'
import { NotesTableRow } from './row'

interface IMatchesTableProps extends ICommonTableProps {
  data: NoteDto[]
  handleDeleteItemClick: (data: {
    id: string
    docNumber: number
    createdAt: string
  }) => void
  onLikeClick: (id: string) => void
  onUnLikeClick: (id: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'favourite', label: '' },
    { id: 'player', label: t('PLAYER') },
    { id: 'positionPlayed', label: t('POSITION') },
    { id: 'percentageRating', label: t('RATING') },
    { id: 'match', label: t('MATCH') },
    { id: 'matchDate', label: t('MATCH_DATE'), isSortingDisabled: true },
    { id: 'author', label: t('AUTHOR') },
    { id: 'createdAt', label: t('CREATED_AT') },
  ]
}

export const NotesTable = ({
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
}: IMatchesTableProps) => {
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
      collapsible
    >
      {data.map(note => (
        <NotesTableRow
          key={note.id}
          data={note}
          onEditClick={() => router.push(`/notes/edit/${note.id}`)}
          onDeleteClick={() =>
            handleDeleteItemClick({
              id: note.id,
              createdAt: note.createdAt,
              docNumber: note.docNumber,
            })
          }
          onLikeClick={onLikeClick}
          onUnlikeClick={onUnLikeClick}
        />
      ))}
    </Table>
  )
}
