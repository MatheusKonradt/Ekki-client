import { createMuiTheme } from '@material-ui/core/styles';

export const palette = {
  primary: {
    main: '#1E5799',
    contrastText: '#fff'
  },
  secondary: {
    main: '#34495e',
    contrastText: '#fff'
  },
  error: {
    main: '#ff0000',
  },
};

export const shadows = ["none"];

export const muiTheme = createMuiTheme({ palette, shadows });