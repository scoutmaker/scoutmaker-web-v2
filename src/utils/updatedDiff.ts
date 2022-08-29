import filter from 'just-filter-object'

type Tobj = Record<string, any>

const isDate = (d: any) => d instanceof Date
const isEmpty = (o: any) => Object.keys(o).length === 0
const isObject = (o: any) => o != null && typeof o === 'object'
const hasOwnProperty = (o: any, ...args: any[]) =>
  // @ts-ignore weird
  Object.prototype.hasOwnProperty.call(o, ...args)
const isEmptyObject = (o: any) => isObject(o) && isEmpty(o)

const getDiff = (lhs: Tobj, rhs: Tobj) => {
  if (lhs === rhs) return {}

  if (!isObject(lhs) || !isObject(rhs)) return rhs

  const l = lhs
  const r = rhs

  if (isDate(l) || isDate(r)) {
    // eslint-disable-next-line eqeqeq
    if (l.valueOf() == r.valueOf()) return {}
    return r
  }

  return Object.keys(r).reduce((acc, key) => {
    if (hasOwnProperty(l, key)) {
      if (Array.isArray(r[key])) {
        acc[key] = r[key]
        return acc
      }
      const difference = getDiff(l[key], r[key])

      // If the difference is empty, and the lhs is an empty object or the rhs is not an empty object
      if (
        isEmptyObject(difference) &&
        !isDate(difference) &&
        (isEmptyObject(l[key]) || !isEmptyObject(r[key]))
      )
        return acc // return no diff

      acc[key] = difference
      return acc
    }

    return acc
  }, {} as Tobj)
}

const updatedDiff = (oldData: Tobj, newData: Tobj) => {
  const filt = filter(newData, (_, value) => value)
  return getDiff(oldData, filt)
}
export default updatedDiff
