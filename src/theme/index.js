import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#424242',
      paper: colors.common.white // define color item select box
    },
    primary: {
      contrastText: '#424242',
      main: '#424242' // mau label
    },
    text: {
      primary: '#424242',
      secondary: '#424242',
      black: '#02060c',
      white: '#ffffff'
    },
    table: {
      background: '#131212'
    }
  },
  shadows,
  typography
});

export default theme;
