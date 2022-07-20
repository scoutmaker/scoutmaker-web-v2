import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { PageHeading } from '../page-heading/page-heading'

interface IErrorContentProps {
  status?: number | null
  message?: string | null
}

export const ErrorContent = ({ status, message }: IErrorContentProps) => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeading title={t('SOMETHING_WENT_WRONG')} />
      <Typography variant="h2" align="center">
        {status || 500}
      </Typography>
      <Typography align="center" marginTop={4}>
        {message}
      </Typography>
    </>
  )
}
