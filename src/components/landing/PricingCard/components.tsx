import { Check, Close } from '@mui/icons-material'
import {
  Button,
  Card,
  Divider,
  ListItemText,
  styled,
  Typography,
} from '@mui/material'

export const CustomCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  position: 'relative',
  overflow: 'visible',
  marginBottom: 50,
}))

export const Heading = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  marginLeft: theme.spacing(4),
  fontWeight: theme.typography.fontWeightBold,

  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2, 0),
    fontSize: 28,
  },
}))

export const TrueIcon = styled(Check)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.success.main,
}))

export const FalseIcon = styled(Close)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.error.main,
}))

export const CustomDivider = styled(Divider)(({ theme }) => ({
  background: theme.palette.primary.light,
}))

export const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  fontSize: 18,

  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
}))

export const CustomButtom = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  fontWeight: theme.typography.fontWeightBold,
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 50%)',

  '&:hover': {
    textDecoration: 'none',
  },

  [theme.breakpoints.down('xs')]: {
    width: '80%',
  },
}))

export const ButtonContainer = styled('div')({
  height: 30,
})
