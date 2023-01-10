import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { InsiderNoteDto } from '../types'
import { InsiderNotesTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: InsiderNoteDto[]
  handleDeleteItemClick?: (data: {
    id: string
    docNumber: number
    date: string
  }) => void
  likeInsiderNoteClick: (id: string) => void
  unLikeInsiderNoteClick: (id: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'favourite', label: '' },
    { id: 'player', label: t('PLAYER') },
    { id: 'position', label: t('PRIMARY_POSITION'), isSortingDisabled: true },
    { id: 'informant', label: t('INFORMANT'), isSortingDisabled: true },
    { id: 'author', label: t('SCOUT'), isSortingDisabled: true },
    { id: 'createdAt', label: t('CREATED_AT') },
  ]
}

export const InsiderNotesTable = ({
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
  likeInsiderNoteClick,
  unLikeInsiderNoteClick,
}: ITableProps) => {
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
      {data.map(insNote => (
        <InsiderNotesTableRow
          key={insNote.id}
          data={insNote}
          onEditClick={() => router.push(`/insider-notes/edit/${insNote.id}`)}
          onDeleteClick={() =>
            handleDeleteItemClick
              ? handleDeleteItemClick({
                  id: insNote.id,
                  date: insNote.createdAt,
                  docNumber: insNote.docNumber,
                })
              : undefined
          }
          onLikeClick={likeInsiderNoteClick}
          onUnlikeClick={unLikeInsiderNoteClick}
          actions={actions}
        />
      ))}
    </Table>
  )
}
