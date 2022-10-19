type TPermissionLevels = NonNullable<
  Components.Schemas.CreateUserPlayerAceDto['permissionLevel']
>

interface IPermissionComboOptions {
  id: TPermissionLevels
  label: TPermissionLevels
}

export const permissionLevelComboData: IPermissionComboOptions[] = [
  { id: 'FULL', label: 'FULL' },
  { id: 'READ', label: 'READ' },
  { id: 'READ_AND_WRITE', label: 'READ_AND_WRITE' },
]
