import { IComboOptions, IStandardComboOptions } from './types'

interface IStandardListData {
  id: string
  name: string
}

export function mapListDataToComboOptions(
  data: IStandardListData[],
): IStandardComboOptions[] {
  return data.map(({ id, name }) => ({
    id,
    label: name,
    name,
  }))
}
type BasicTypes = string | number | boolean
export type TFiltersStateData = Record<
  string,
  BasicTypes | IComboOptions[] | IComboOptions | null
>

export const mapFiltersStateToDto = (data: TFiltersStateData) => {
  const filtersDto: Record<string, BasicTypes | string[]> = { ...data } as any

  Object.keys(data).forEach(key => {
    const value = data[key]

    if (Array.isArray(value)) {
      if (value.length && typeof value[0] === 'string') {
        filtersDto[key] = []
        return
      }
      filtersDto[key] = value.map(el => el.id)
      return
    }
    if (
      value &&
      typeof value === 'object' &&
      Object.prototype.hasOwnProperty.call(value, 'id')
    )
      filtersDto[key] = (value as IComboOptions).id || ''
  })

  return filtersDto
}
