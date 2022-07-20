import * as yup from 'yup'

interface IValidateIdArgs {
  required?: boolean
  message?: string
}

export function validateId(args?: IValidateIdArgs) {
  const { message, required } = args || {}

  if (required) {
    return yup.number().notOneOf([0], message).required(message)
  }

  return yup.number().notOneOf([0], message)
}

export function validateIdsArray() {
  return yup.array().of(yup.number())
}
