export interface IComboProps<T> {
  data: T[]
  name: string
  label?: string
  multiple?: boolean
  size?: 'medium' | 'small'
  error?: boolean
  helperText?: string
}
