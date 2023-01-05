import * as yup from 'yup'

interface IValidateIdArgs {
  required?: boolean
  message?: string
}

export function validateId(args?: IValidateIdArgs) {
  const { message, required } = args || {}

  if (required) {
    return yup.string().nullable().required(message)
  }

  return yup.string().nullable()
}

export function validateIdsArray() {
  return yup.array().of(yup.string())
}
