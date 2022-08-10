import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionAgeCategories, useDeleteCompetitionAgeCategory } from '@/modules/competition-age-categories/hooks'
import { CompetitionAgeCategoriesTableRow } from '@/modules/competition-age-categories/table/row'
import { CompetitionAgeCategoriesTable } from '@/modules/competition-age-categories/table/table'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'comp-age-categ'], ['ADMIN'])

interface IToDeleteData {
  id: number
  name: string
}

const CompetitionAgeCategoriesPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] =
    useState<IToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('compAgeCategTable')

  const { data: compAgeCateg, isLoading: dataLoading } = useCompetitionAgeCategories({})

  const { mutate: deleteCompAgeCateg, isLoading: deleteLoading } = useDeleteCompetitionAgeCategory()

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {(dataLoading ||
        deleteLoading) && <Loader />}
      <PageHeading title={t('comp-age-categ:INDEX_PAGE_TITLE')} />
      <CompetitionAgeCategoriesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        // @ts-ignore
        total={compAgeCateg?.length || 0}
        actions
      >
        {!!compAgeCateg &&
          // @ts-ignore
          compAgeCateg.map((item: CompetitionAgeCategortyDto) => (
            <CompetitionAgeCategoriesTableRow
              key={item.id}
              data={item}
              onEditClick={() => {
                router.push(`/competition-age-categories/edit/${item.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: item.id, name: item.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))
        }
      </CompetitionAgeCategoriesTable>
      <Fab href="/competition-age-categories/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('comp-age-categ:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData)
            deleteCompAgeCateg(toDeleteData.id)

          setToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default CompetitionAgeCategoriesPage