import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { formatDate } from '@/utils/format-date'
import { getDocumentNumber } from '@/utils/get-document-number'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { UserInsiderNoteAclDto } from '../types'

interface ITableRowProps {
  data: UserInsiderNoteAclDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const UserInsiderNoteAclTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
}: ITableRowProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, createdAt, insiderNote, permissionLevel, user } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen
          ? undefined
          : () => router.push(`/user-insider-note-acl/${id}`)
      }
    >
      <StyledTableCell padding="checkbox">
        <TableMenu
          menuAnchorEl={menuAnchorEl}
          isMenuOpen={isMenuOpen}
          onMenuClick={handleMenuClick}
          onMenuClose={handleMenuClose}
          onDeleteClick={() => handleMenuAction(onDeleteClick)}
          onEditClick={() => handleMenuAction(onEditClick)}
        />
      </StyledTableCell>
      <CellWithLink
        href={`/insider-notes/${insiderNote.id}`}
        label={getDocumentNumber(insiderNote)}
      />
      <CellWithLink
        href={`/users/${user.id}`}
        label={`${user.firstName} ${user.lastName}`}
      />
      <StyledTableCell>{t(`permissions:${permissionLevel}`)}</StyledTableCell>
      <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
    </StyledTableRow>
  )
}
