import { Link as MuiLink, Modal, styled, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { PlayerRoleBasicDto } from '../player-roles/types'

interface IProps {
  open: boolean
  onClose: () => void
  role: PlayerRoleBasicDto
}

const ModalBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  background: theme.palette.primary.main,
  padding: 10,
  borderRadius: 6,
  boxShadow: theme.shadows[24],

  [theme.breakpoints.down('sm')]: {
    width: '94%',
  },
}))

const RoleModal = ({ onClose, open, role }: IProps) => {
  const { t } = useTranslation()

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="role-modal-title"
      aria-describedby="role-modal-description"
      disableEnforceFocus
      disableAutoFocus
    >
      <ModalBox>
        <Typography
          id="role-modal-title"
          variant="h6"
          component="h2"
          color="primary.contrastText"
        >
          {role?.name}
        </Typography>
        <Typography
          id="role-modal-description"
          color="primary.contrastText"
          marginTop={1}
        >
          {role?.description}
        </Typography>
        <Link href="/player-roles" passHref>
          <MuiLink color="rgba(255, 255, 255, 0.42)">
            {t('SEE_DETAILS')}
          </MuiLink>
        </Link>
      </ModalBox>
    </Modal>
  )
}

export default RoleModal
