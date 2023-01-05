import { useFormikContext } from 'formik'
import { Router } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

export const useConfirmOnLeavePage = (showPrompt: boolean = true) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (!showPrompt) return

    const beforeUnload = (e: BeforeUnloadEvent) => {
      // Cancel the event
      e.preventDefault() // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = ''
    }
    const routeChangeStart = () => {
      const leave = window.confirm(t('LEAVE_PAGE_PROMPT'))
      if (!leave) {
        Router.events.emit('routeChangeError')
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw 'Abort route change. Please ignore this error.'
      }
    }

    Router.events.on('routeChangeStart', routeChangeStart)
    window.addEventListener('beforeunload', beforeUnload)

    // eslint-disable-next-line consistent-return
    return () => {
      Router.events.off('routeChangeStart', routeChangeStart)
      window.removeEventListener('beforeunload', beforeUnload)
    }
  }, [showPrompt])
}

export const ConfirmOnLeaveForm = () => {
  const [isFormChanged, setIsFormChanged] = useState(false)

  const { touched } = useFormikContext<{}>()

  useEffect(() => {
    if (Object.keys(touched).length) setIsFormChanged(true)
  }, [touched])

  useConfirmOnLeavePage(isFormChanged)

  return null
}
