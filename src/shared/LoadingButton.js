import { LoadingButton as Btn } from '@mui/lab';
import { styled } from '@mui/material';

import { col, contrast, shouldForwardProp } from '../mui-settings';

/**Allows additional custom props : fontSize, borderRadius, minWidth, maxWidth, minHeight, maxHeight, flat, frozen */
export const LoadingButton = styled(Btn, { shouldForwardProp: shouldForwardProp })`
  font-size: ${p => p.fontSize};
  border-radius: ${p => p.borderRadius};
  min-width: ${p => p.minWidth};
  max-width: ${p => p.maxWidth};
  min-height: ${p => p.minHeight};
  max-height: ${p => p.maxHeight};
  box-shadow: ${p => p.flat && 'none'};
  &:hover {
    box-shadow: ${p => p.flat && 'none'};
    background-color: ${p => p.variant && p.variant === 'outlined' && p.frozen && contrast[p.color || 'primary']()};
    color: ${p => p.variant && p.variant === 'outlined' && p.frozen && col[p.color || 'primary']()};
  }
`;
