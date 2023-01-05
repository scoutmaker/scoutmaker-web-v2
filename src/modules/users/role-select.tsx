import { UserDto } from './types'

export const rolesComboData: {
  id: UserDto['role']
  label: UserDto['role']
}[] = [
  { id: 'ADMIN', label: 'ADMIN' },
  { id: 'PLAYMAKER_SCOUT', label: 'PLAYMAKER_SCOUT' },
  { id: 'PLAYMAKER_SCOUT_MANAGER', label: 'PLAYMAKER_SCOUT_MANAGER' },
  { id: 'SCOUT', label: 'SCOUT' },
]
