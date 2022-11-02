import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { formatDate } from '@/utils/format-date'
import { getDocumentNumber } from '@/utils/get-document-number'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { OrganizationReportAclDto } from '../types'

interface ITableRowProps {
  data: OrganizationReportAclDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const OrganizationReportAclTableRow = ({
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

  const { id, createdAt, organization, permissionLevel, report } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen
          ? undefined
          : () => router.push(`/organization-report-acl/${id}`)
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
        href={`/organizations/${organization.id}`}
        label={organization.name}
      />
      <CellWithLink
        href={`/reports/${report.id}`}
        label={getDocumentNumber(report)}
      />
      <StyledTableCell>{t(`permissions:${permissionLevel}`)}</StyledTableCell>
      <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
    </StyledTableRow>
  )
}
