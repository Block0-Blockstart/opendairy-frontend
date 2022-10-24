import { styled, Toolbar } from '@mui/material';

import { col, mw } from '../../mui-settings';

export const Toolbar1 = styled(Toolbar)`
  background-color: ${col.light};
  padding: 0 60px;

  @media screen and (min-width: ${mw.sm}px) {
    padding: 0 60px;
  }

  @media screen and (min-width: ${mw.lg}px) {
    padding: 0;
  }
`;

export const GridDOM1 = styled('div')`
  display: grid;
  grid-auto-columns: 1fr;
  grid-column-gap: 13px;
  grid-row-gap: 13px;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
`;
