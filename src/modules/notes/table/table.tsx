import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { NoteDto } from '../types'
import { NotesTableRow } from './row'

interface IMatchesTableProps extends ICommonTableProps {
  data: NoteDto[]
  handleDeleteItemClick?: (data: {
    id: string
    docNumber: number
    createdAt: string
  }) => void
  onLikeClick: (note: NoteDto) => void
  onUnLikeClick: (id: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'favourite', label: '' },
    { id: 'match', label: t('MATCH_DATE') },
    { id: 'matchName', label: t('MATCH'), isSortingDisabled: true },
    { id: 'percentageRating', label: t('RATING') },
    { id: 'player', label: t('PLAYER') },
    { id: 'positionPlayed', label: t('POSITION') },
    { id: 'author', label: t('SCOUT') },
    {
      id: 'observationType',
      label: t('OBSERVATION'),
      isSortingDisabled: true,
    },
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
          onDeleteClick={
            handleDeleteItemClick
              ? () =>
                  handleDeleteItemClick({
                    id: note.id,
                    createdAt: note.createdAt,
                    docNumber: note.docNumber,
                  })
              : undefined
          }
          onLikeClick={onLikeClick}
          onUnlikeClick={onUnLikeClick}
          withoutActions={!actions}
        />
      ))}
    </Table>
  )
}
