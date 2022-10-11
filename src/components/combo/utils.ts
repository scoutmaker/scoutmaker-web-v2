import { IComboOptions } from './types'

interface IStandardListData {
  id: string
  name: string
}

export function mapListDataToComboOptions(
  data: IStandardListData[],
): IComboOptions[] {
  return data.map(({ id, name }) => ({
    id,
    label: name,
  }))
}
type BasicTypes = string | number | boolean
type TFiltersStateData = Record<
  string,
  BasicTypes | IComboOptions[] | IComboOptions | null
>

export const mapFiltersStateToDto = (data: TFiltersStateData) => {
  const filtersDto: Record<string, BasicTypes | string[]> = { ...data } as any

  Object.keys(data).forEach(key => {
    const value = data[key]

    if (Array.isArray(value)) {
      filtersDto[key] = value.map(el => el.id)
      return
    }
    if (typeof value === 'object' && value?.id) filtersDto[key] = value.id
  })
  return filtersDto
}
