import { TFunction } from 'next-i18next'

type TPermissionLevels = NonNullable<
  Components.Schemas.CreateUserNoteAceDto['permissionLevel']
>

interface IPermissionComboOptions {
  id: TPermissionLevels
  label: TPermissionLevels
}

export const getPermissionLevelComboData = (
  t: TFunction,
): IPermissionComboOptions[] => [
  { id: 'FULL', label: t('permissions:FULL') },
  { id: 'READ', label: t('permissions:READ') },
  { id: 'READ_AND_WRITE', label: t('permissions:READ_AND_WRITE') },
]
