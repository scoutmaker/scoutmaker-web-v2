import { ReactNode, useMemo, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import AlertsContext from './alertsContext'
import alertsReducer from './alertsReducer'
import { SetAlertParams, State } from './types'

interface IAlertsStateProps {
  children: ReactNode
}

export const AlertsState = ({ children }: IAlertsStateProps) => {
  const initialState: State = {
    alerts: [],
    setAlert: () => null,
  }

  const [state, dispatch] = useReducer(alertsReducer, initialState)

  // Set alert
  const setAlert = ({ msg, type, timeout = 5000 }: SetAlertParams) => {
    const id = uuidv4()

    dispatch({
      type: 'SET_ALERT',
      payload: { id, msg, type, isVisible: true },
    })

    setTimeout(
      () => dispatch({ type: 'HIDE_ALERT', payload: id }),
      timeout - 1000,
    )

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout)
  }

  const { alerts } = state

  const value = useMemo(
    () => ({
      alerts,
      setAlert,
    }),
    [alerts],
  )

  return (
    <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
  )
}
