import {
  Favorite as UnlikeIcon,
  FavoriteBorder as LikeIcon,
} from '@mui/icons-material'
import { styled } from '@mui/material'
import { MouseEvent } from 'react'

import { StyledTableCell } from '../tables/cell'

interface IProps {
  isLiked: boolean
  onClicked: () => void
}

export const LikedTableCell = ({ isLiked, onClicked }: IProps) => {
  const onClick = (e: MouseEvent) => {
    e.stopPropagation()
    onClicked()
  }

  return (
    <StyledTableCell onClick={onClick} padding="checkbox">
      <LikedIconsContainer>
        {isLiked ? (
          <UnlikeIcon fontSize="small" color="error" />
        ) : (
          <LikeIcon fontSize="small" />
        )}
      </LikedIconsContainer>
    </StyledTableCell>
  )
}

const LikedIconsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  transition: 'transform 200ms ease-in-out',
  '&:hover': {
    transform: 'scale(1.2)',
  },
})
