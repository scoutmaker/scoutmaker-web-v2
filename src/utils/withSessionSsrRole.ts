import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import { withSessionSsr } from '@/modules/auth/session'
import { ApiError } from '@/services/api/types'

import { redirectToLogin } from './redirect-to-login'

export type ISsrRole<T = null> = {
  errorStatus: number | null
  errorMessage: string | null
  data: T | null
}
type TRole = Components.Schemas.UserDto['role']

export function withSessionSsrRole<T>(
  _translations: string[],
  requiredRoles: TRole[],
  getData?: (
    token: string,
    params: ParsedUrlQuery,
  ) => Promise<{ data: T | null; error?: ApiError }>,
) {
  return withSessionSsr<ISsrRole<T>>(async ({ locale, req, res, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          data: null,
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
          data: null,
        },
      }
    }

    if (getData) {
      const resd = await getData(
        req.session.token as string,
        params as ParsedUrlQuery,
      )
      if (resd.error) {
        const { response } = resd.error

        return {
          props: {
            ...translations,
            errorStatus: response.status,
            errorMessage: response.data.message,
            data: null,
          },
        }
      }
      return {
        props: {
          ...translations,
          errorStatus: null,
          errorMessage: null,
          data: resd.data,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        data: null,
      },
    }
  })
}
