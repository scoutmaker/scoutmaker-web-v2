import { UpdateUserDto } from '../auth/auth'

export type SettingsDto = Pick<
  UpdateUserDto,
  'reportTemplateId' | 'reportBackgroundImageId'
>
