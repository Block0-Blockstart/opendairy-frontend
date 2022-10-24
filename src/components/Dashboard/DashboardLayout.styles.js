import { styled, Tab, Tabs } from '@mui/material';

import { col } from '../../mui-settings';

export const Tabs1 = styled(Tabs)`
  height: 64px;
  background-color: ${col.dark};
  color: ${col.light};
  padding: 0;
  margin: 0;
`;

export const Tab1 = styled(Tab)`
  font-size: ${p => p.fontSize || '1rem'};
  letter-spacing: 0.03rem;
  height: 64px;
  padding: 0;

  &.Mui-selected {
    color: ${col.light};
  }
`;
