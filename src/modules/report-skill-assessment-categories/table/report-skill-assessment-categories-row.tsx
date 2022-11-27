import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { ReportSkillAssessmentCategoryDto } from '../types'
import { getSingleReportSkillAssessmentCategoryRoute } from '../utils'

interface IReportSkillAssessmentCategoriesTableRowProps {
  data: ReportSkillAssessmentCategoryDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const ReportSkillAssessmentCategoriesTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
}: IReportSkillAssessmentCategoriesTableRowProps) => {
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, name } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen
          ? undefined
          : () => router.push(getSingleReportSkillAssessmentCategoryRoute(id))
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
      <StyledTableCell>{name}</StyledTableCell>
    </StyledTableRow>
  )
}
