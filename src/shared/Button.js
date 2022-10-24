import { Button as Btn, styled } from '@mui/material';

import { col, contrast, shouldForwardProp } from '../mui-settings';

/**Allows additional custom props : fontSize, borderRadius, minWidth, maxWidth, minHeight, maxHeight, flat, frozen */
export const Button = styled(Btn, { shouldForwardProp: shouldForwardProp })`
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

  ${p =>
    p.size &&
    p.size === 'tiny' &&
    `
    font-size: 0.825rem;
    line-height: 0.825rem;
    font-weight: 500;
    letter-spacing: 0.0175rem;
    padding: 0.5275rem 0.885rem 0.53rem;`}
  ${p => p.size && p.size === 'tiny' && p.variant && p.variant === 'outlined' && `padding: 0.4025rem 0.76rem 0.405rem;`}
`;
