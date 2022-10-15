import { IComboOptions } from '@/components/combo/types'

import { UserBasicDataDto } from './types'

export function mapUsersListToComboOptions(
  data: UserBasicDataDto[],
): IComboOptions[] {
  return data.map(({ id, firstName, email, lastName }) => ({
    id,
    label: `${firstName} ${lastName} (${email})`,
  }))
}
