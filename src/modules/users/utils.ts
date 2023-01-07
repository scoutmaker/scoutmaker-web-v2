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

  const stars = profile
    ? Array.from(Array(profile.rating).keys())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(_ => '⭐')
        .join('')
    : ''

  return `${firstName} ${lastName} ${stars}`
}
