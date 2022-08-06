import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { withSessionSsr } from '@/modules/auth/session'

import { redirectToLogin } from './redirect-to-login'

export type ISsrRole = {
  errorStatus: number | null
  errorMessage: string | null
}

export const withSessionSsrRole = (
  _translations: string[],
  requiredRoles: string[],
) =>
  withSessionSsr<ISsrRole>(async ({ locale, req, res }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
        },
      }
    }

    const translations = await serverSideTranslations(
      locale || 'pl',
      _translations,
    )

    if (!requiredRoles.includes(user.role)) {
      return {
        props: {
          ...translations,
          errorStatus: 401,
          errorMessage: 'Insufficient Permissions',
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
      },
    }
  })
