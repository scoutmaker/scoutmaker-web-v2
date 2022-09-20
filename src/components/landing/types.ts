import { ReactNode } from 'react'

export interface Advantage {
  title: string
  icon: ReactNode
  text: string
}

export interface Value {
  number: string
  title: string
  icon: ReactNode
  values: string[]
  link: string
}

export interface Effect {
  logo: string
  name: string
  text: string
  link: string
}
