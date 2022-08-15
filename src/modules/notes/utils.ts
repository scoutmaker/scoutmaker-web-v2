interface IGetNoteNumberArgs {
  id: number
  createdAt: string
}

export function getNoteNumber({ id, createdAt }: IGetNoteNumberArgs) {
  return `${id}/${new Date(createdAt).getFullYear()}`
}
