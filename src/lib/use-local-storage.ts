import { useState } from 'react'

interface IUseLocalStorageArgs<ValueType> {
  key: string
  initialValue: ValueType
}

export function useLocalStorage<ValueType>({
  key,
  initialValue,
}: IUseLocalStorageArgs<ValueType>) {
  const [storedValue, setStoredValue] = useState<ValueType>(() => {
    try {
      const localStorageValue = localStorage.getItem(key)
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
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
