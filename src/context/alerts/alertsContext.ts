import { createContext } from 'react'

import { State } from './types'

const alertsContext = createContext<State | undefined>(undefined)

export default alertsContext
