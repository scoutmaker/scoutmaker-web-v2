/* eslint-disable no-prototype-builtins */
// ^suggested by documentation - hardcoded keys

/* eslint-disable consistent-return  */
// ^it's a forEach there so what to return
import { TFunction } from 'next-i18next'

import { keyTextMap } from './getTextFromKey'
import { IFilterAccordionDtos } from './types'

interface IProps extends IFilterAccordionDtos {
  filters: { [key: string]: any }
}

export const getFiltersText = (t: TFunction, props: IProps) => {
  const finalArray: string[] = []
  const keyTextMapTrans = keyTextMap(t, props)
  const { filters } = props

  Object.keys(filters).forEach(key => {
    const value = filters[key]
    if (!value) return
    
    const types = ['string', 'number', 'boolean']
    if (types.includes(typeof value)) {
      if (!keyTextMapTrans.hasOwnProperty(key))
        return finalArray.push(`NOT IMPLEMENTED: ${key}`)
      return finalArray.push(keyTextMapTrans[key](value))
    }

    if (Array.isArray(value)) {
      if (!value.length) return

      if (!keyTextMapTrans.hasOwnProperty(key))
        return finalArray.push(`NOT IMPLEMENTED: ${key}`)
      return finalArray.push(keyTextMapTrans[key](value))
    }
  })
  return finalArray
}
