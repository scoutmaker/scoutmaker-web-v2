import { useState } from 'react'

interface IUseLocalStorageArgs<ValueType> {
  key: string
  initialValue: ValueType
}

export function useLocalStorage<ValueType>({
  key,
  initialValue,
}: IUseLocalStorageArgs<ValueType>) {
  const isBrowser = typeof window !== 'undefined'

  const [storedValue, setStoredValue] = useState<ValueType>(() => {
    try {
      const localStorageValue = isBrowser ? localStorage.getItem(key) : null
      return localStorageValue ? JSON.parse(localStorageValue) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  function setValue(value: ValueType | ((val: ValueType) => ValueType)) {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (isBrowser) {
        localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
