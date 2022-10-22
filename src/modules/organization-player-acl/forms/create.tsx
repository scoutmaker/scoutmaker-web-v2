import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { getPermissionLevelComboData } from '@/components/acl/PermissionLevelComboData'
import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'

import { CreateOrganizationPlayerAclDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateOrganizationPlayerAclDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  organiztaionsData: OrganizationBasicDataDto[]
  playersData: PlayerBasicDataDto[]
}

export const CreateOrganizationPlayerAclForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  organiztaionsData,
  playersData,
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()
  const permissionLevelComboData = getPermissionLevelComboData(t)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreateValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateOrganizationPlayerAclDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <BasicCombo
              data={mapListDataToComboOptions(organiztaionsData)}
              name="organizationId"
              error={touched.organizationId && !!errors.organizationId}
              helperText={
                touched.organizationId ? errors.organizationId : undefined
              }
              label={t('ORGANIZATION')}
            />
            <BasicCombo
              data={mapPlayersListToComboOptions(playersData)}
              name="playerId"
              error={touched.playerId && !!errors.playerId}
              helperText={touched.playerId ? errors.playerId : undefined}
              label={t('PLAYER')}
            />
            <BasicCombo
              data={permissionLevelComboData}
              name="permissionLevel"
              error={touched.permissionLevel && !!errors.permissionLevel}
              helperText={
                touched.permissionLevel ? errors.permissionLevel : undefined
              }
              label={t('PERMISSION_LEVEL')}
            />
            <MainFormActions
              label={t('ORGANIZATION_PLAYER_ACE')}
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick()
                }
                handleReset()
                setAlert({ msg: t('CHANGES_CANCELLED'), type: 'warning' })
              }}
            />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
