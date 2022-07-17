import { Breadcrumbs as MUIBreadcrumbs } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Crumb } from './crumb'
import { generateBreadcrumbs } from './utils'

export const Breadcrumbs = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const breadcrumbs = useMemo(
    () => generateBreadcrumbs(router),
    [router.asPath],
  )

  return (
    <MUIBreadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
      {breadcrumbs.map((crumb, idx) => (
        <Crumb
          href={crumb.href}
          text={t(crumb.title.toUpperCase())}
          key={crumb.href}
          last={idx === breadcrumbs.length - 1}
        />
      ))}
    </MUIBreadcrumbs>
  )
}
