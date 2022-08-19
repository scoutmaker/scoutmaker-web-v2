import { updatedDiff } from 'deep-object-diff'
import filter from 'just-filter-object'

export function getEditDataToSubmit(initialValues: object, data: object) {
  return updatedDiff(
    initialValues,
    filter(data, (_, value) => value),
  )
}
