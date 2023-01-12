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

export function getAuthorDisplayName(data: UserBasicDataDto) {
  const { firstName, lastName, profile } = data

  return `${firstName} ${lastName} ${'⭐'.repeat(profile?.rating || 0)}`
}
