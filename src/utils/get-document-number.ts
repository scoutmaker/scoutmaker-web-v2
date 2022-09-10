interface IGetDocumentNumberArgs {
  id: number
  createdAt: string
}

export function getDocumentNumber({ id, createdAt }: IGetDocumentNumberArgs) {
  return `${id}/${new Date(createdAt).getFullYear()}`
}
