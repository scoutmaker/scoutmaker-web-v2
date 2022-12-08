import { Router } from 'next/router'
import { useEffect } from 'react'

export const useConfirmOnLeavePage = () => {
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      // Cancel the event
      e.preventDefault() // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = ''
    }
    const routeChangeStart = () => {
      const ok = window.confirm('Do you want to leave the current page?')
      if (!ok) {
        Router.events.emit('routeChangeError')
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw 'Abort route change. Please ignore this error.'
      }
    }
    Router.events.on('routeChangeStart', routeChangeStart)
    window.addEventListener('beforeunload', beforeUnload)

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart)
      window.removeEventListener('beforeunload', beforeUnload)
    }
  }, [])
}
