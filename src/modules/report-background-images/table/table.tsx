import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell, INameToDeleteData } from '@/types/tables'

import { ReportBgImageDto } from '../types'
import { ReportBgImagesTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: ReportBgImageDto[]
  handleDeleteItemClick: (data: INameToDeleteData) => void
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'url', label: t('URL'), isSortingDisabled: true },
  ]
}

export const ReportBgImagesTable = ({
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
      {data.map(repImg => (
        <ReportBgImagesTableRow
          key={repImg.id}
          data={repImg}
          onEditClick={() =>
            router.push(`/report-background-images/edit/${repImg.id}`)
          }
          onDeleteClick={() =>
            handleDeleteItemClick({ id: repImg.id, name: repImg.name })
          }
        />
      ))}
    </Table>
  )
}
