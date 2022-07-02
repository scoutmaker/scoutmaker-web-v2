import { User } from '../types/auth'

export function isAdmin(user?: User) {
  return user?.role === 'ADMIN'
}

export function isPlaymakerScout(user?: User) {
  return user?.role === 'PLAYMAKER_SCOUT'
}

export function isPrivilegedUser(user?: User) {
  return isAdmin(user) || isPlaymakerScout(user)
}
