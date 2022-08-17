import { useTranslation } from 'next-i18next'
import React from 'react'

import { ErrorContent } from '@/components/error/error-content';
import { Loader } from '@/components/loader/loader';
import { PageHeading } from '@/components/page-heading/page-heading';
import { useMatchesList } from '@/modules/matches/hooks';
import { CreateOrderForm } from '@/modules/orders/forms/create';
import { useCreateOrder } from '@/modules/orders/hooks';
import { usePlayersList } from '@/modules/players/hooks';
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole';

export const getServerSideProps = withSessionSsrRole(['common', 'orders'], ['ADMIN', 'PLAYMAKER_SCOUT']);

const CreateOrderPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation();

  const { data: matchesData, isLoading: matchesLoading } = useMatchesList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()

  const { mutate: createOrder, isLoading: isCreateLoading } = useCreateOrder();


  const isLoading = isCreateLoading || matchesLoading || playersLoading
  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t("orders:CREATE_PAGE_TITLE")}
      />
      <CreateOrderForm
        matchesData={matchesData || []}
        playersData={playersData || []}
        onSubmit={createOrder}

      />
    </>
  )
}

export default CreateOrderPage