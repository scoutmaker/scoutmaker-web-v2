interface IGetDocumentNumberArgs {
  id: string
  createdAt: string
}

export function getDocumentNumber({ id, createdAt }: IGetDocumentNumberArgs) {
  return `${id}/${new Date(createdAt).getFullYear()}`
}
