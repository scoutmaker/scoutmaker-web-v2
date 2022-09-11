interface IGetDocumentNumberArgs {
  docNumber: number
  createdAt: string
}

export function getDocumentNumber({
  docNumber,
  createdAt,
}: IGetDocumentNumberArgs) {
  return `${docNumber}/${new Date(createdAt).getFullYear()}`
}
