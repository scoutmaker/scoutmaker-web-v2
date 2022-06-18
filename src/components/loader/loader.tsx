import { Backdrop, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 999,
  color: '#fff',
}))

export const Loader = () => (
  <StyledBackdrop open>
    <CircularProgress color="inherit" />
  </StyledBackdrop>
)
