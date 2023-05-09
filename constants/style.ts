import { extendTheme } from '@chakra-ui/react'

//Chakra UI setup
export const theme = extendTheme({
  colors: {
    primary: {
      main: '#08CE59',
      light: '#5dfc9d',
      dark: '#039b40',
    },
    white: '#ffffff',
    black: {
      50: '#D2D3D4',
      100: '#A5A6A9',
      300: '#808191',
      500: '#11142D',
      700: '#1B1D21',
      900: '#000000',
    },
    red: '#D10000',
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
  },
})
