import { IUsersComboOptions, UserBasicDataDto } from './types'

export function mapUsersListToComboOptions(
  data: UserBasicDataDto[],
): IUsersComboOptions[] {
  return data.map(({ id, firstName, email, lastName }) => ({
    id,
    label: `${firstName} ${lastName} (${email})`,
    firstName,
    lastName,
  }))
}
