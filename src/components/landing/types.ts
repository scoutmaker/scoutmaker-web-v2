import { StaticImageData } from 'next/image'
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
  logo: StaticImageData
  name: string
  text: string
  link: string
}

export type LandingPageEmailDto = Components.Schemas.LandingEmailDto
