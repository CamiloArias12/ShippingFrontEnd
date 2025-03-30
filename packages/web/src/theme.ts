import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(240, 90, 40)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(240, 90, 40)',
          '&:hover': {
            backgroundColor: 'rgb(220, 70, 20)',
          },
        },
        contained: {
          backgroundColor: 'rgb(240, 90, 40)',
          '&:hover': {
            backgroundColor: 'rgb(220, 70, 20)',
          },
        },
      },
    },
  },
});

export default theme;