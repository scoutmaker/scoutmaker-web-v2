export function getIdsArray<T extends { id: string }>(input: T[]) {
  return input.map(item => item.id)
}
