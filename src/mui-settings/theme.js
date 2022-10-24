import { createTheme } from '@mui/material/styles';

import { MuiButton } from './theme-components/MuiButton';
import { MuiFormControlLabel } from './theme-components/MuiFormControlLabel';
import { MuiFormLabel } from './theme-components/MuiFormLabel';
import { MuiInput } from './theme-components/MuiInput';
import { MuiLink } from './theme-components/MuiLink';
import { MuiTab } from './theme-components/MuiTab';
import { MuiTableCell } from './theme-components/MuiTableCell';
import { MuiTableRow } from './theme-components/MuiTableRow';
import { MuiTabs } from './theme-components/MuiTabs';
import { getDefaultTheme, replaceDefaultFont, smartCol } from './theme-helpers';

/* palette colors are core colors only. Colors applied only on a single component my not be in the palette.
 * for example: #fef4db is a very light brown rarely used as background, and thus not included
 */
export const openDairyTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#87ae35',
      dark: '#477e0b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0082f3', // original OD css uses this on nav links, droplists selected option, some borders,...
      contrastText: '#fff',
      // Some variants available in original OD theme :
      // #3898ec #2394e7
    },
    light: {
      main: '#fff',
      contrastText: '#1c1c1c',
    },
    dark: {
      main: '#1c1c1c',
      dark: '#000',
      contrastText: '#fff',
    },
    grey100: {
      main: '#f4f4f4', // used for dashboard line hovered
      dark: '#e0e0e0',
      contrastText: '#1c1c1c',
    },
    grey800: {
      main: '#333333',
      dark: '#1f1f1f',
      contrastText: '#fff',
    },
    altGrey100: {
      main: '#efeeec', // used as dashboard background
      dark: '#e3e1de',
      contrastText: '#1c1c1c',
    },
    altGrey800: {
      main: '#38352e',
      dark: '#22201c',
      contrastText: '#fff',
    },
    slateGrey: {
      main: '#778899',
      contrastText: '#fff',
    },
    darkSlateGrey: {
      main: '#2F4F4F',
      contrastText: '#fff',
    },
  },
  shadows: {
    ...getDefaultTheme().shadows,
    25: '0 7px 15px 0 rgb(0 0 0 / 12%)', // OD specific elevation on papers
  },
  typography: {
    ...replaceDefaultFont('"Averta", serif'),
    fontSize: 16,
  },
  components: {
    MuiButton: MuiButton,
    MuiFormControlLabel: MuiFormControlLabel,
    MuiFormLabel: MuiFormLabel,
    MuiInput: MuiInput,
    MuiLink: MuiLink,
    MuiTab: MuiTab,
    MuiTabs: MuiTabs,
    MuiTableCell: MuiTableCell,
    MuiTableRow: MuiTableRow,
  },
});

export const { col, contrast } = smartCol(openDairyTheme);
