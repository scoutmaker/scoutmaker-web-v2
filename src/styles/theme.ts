import { createTheme } from '@mui/material/styles'
import { plPL } from '@mui/material/locale'
import { black, lightGray, green, red, yellow } from './colors'

const fontFamily = [
  'Lato',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif',
].join(',')

export const theme = createTheme(
  {
    spacing: 8,
    typography: {
      fontFamily,
      h2: {
        fontSize: '2rem',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '1.5rem',
      },
    },
    palette: {
      primary: {
        main: black,
      },
      secondary: {
        main: red,
      },
      success: {
        main: green,
      },
      info: {
        main: yellow,
      },
      error: {
        main: red,
      },
      background: {
        default: lightGray,
      },
    },
    components: {
      MuiTableSortLabel: {
        styleOverrides: {
          root: {
            '&.Mui-active': {
              color: yellow,

              // '&.MuiSvgIcon': {
              //   color: yellow,
              // },
            },
            '&:hover': {
              color: yellow,
            },
            '&:focus': {
              color: yellow,
            },
          },
          icon: {
            color: yellow,
          },
        },
      },
    },
  },
  plPL,
)
