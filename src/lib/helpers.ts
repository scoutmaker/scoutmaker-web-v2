type TValue = string | string[] | number | boolean

export function mapObjectToQueryParams(params: Record<string, TValue>) {
  const query = Object.entries(params)
    .map(([key, value]) => {
      if (!value) {
        return null
      }

      if (
        typeof value !== 'number' &&
        typeof value !== 'boolean' &&
        value.length === 0
      ) {
        return null
      }

      if (typeof value === 'object') {
        return value?.map((val: string) => `${key}=${val}`).join('&')
      }

      return `${key}=${value}`
    })
    .filter(item => item)
    .join('&')

  return query
}
