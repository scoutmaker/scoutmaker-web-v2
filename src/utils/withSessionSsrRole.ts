import { ParsedUrlQuery } from 'node:querystring'

import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { withSessionSsr } from '@/modules/auth/session'
import { UserDto } from '@/modules/users/types'
import { ApiError } from '@/services/api/types'

import { redirectToLogin } from './redirect-to-login'

export type TSsrRole<T = null> = {
  errorStatus: number | null
  errorMessage: string | null
  data: T | null
}
type TRole = Components.Schemas.UserDto['role'] | 'SCOUT_ORGANIZATION'

export function withSessionSsrRole<T>(
  _translations: string[],
  allowedRoles: TRole[] | false,
  getData?: (
    token: string,
    params: ParsedUrlQuery,
    user?: Components.Schemas.UserDto,
  ) => Promise<{ data: T | null; error?: ApiError }>,
) {
  return withSessionSsr<TSsrRole<T>>(async ({ locale, req, res, params }) => {
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

    // for error message
    if (!_translations.includes('common')) _translations.push('common')

    const translations = await serverSideTranslations(
      locale || 'pl',
      _translations,
    )

    if (allowedRoles && !userHasAccess(allowedRoles, user)) {
      return {
        props: {
          ...translations,
          errorStatus: 401,
          errorMessage: i18n?.t('NO_PERMISSIONS') || 'Insufficient Permissions',
          data: null,
        },
      }
    }

    let data = null
    if (getData) {
      const resd = await getData(
        req.session.token as string,
        params as ParsedUrlQuery,
        user,
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
      data = resd.data
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        data,
      },
    }
  })
}

const userHasAccess = (allowedRoles: TRole[], user: UserDto) => {
  if (
    allowedRoles.includes('SCOUT_ORGANIZATION') &&
    user.role === 'SCOUT' &&
    user.organizationId
  ) {
    return true
  }

  if (!allowedRoles.includes(user.role)) {
    return false
  }

  return true
}
