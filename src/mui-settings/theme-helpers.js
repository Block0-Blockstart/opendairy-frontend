import { createTheme } from '@mui/material';

// /**
//  * Handy shortcut for styles components using colors from theme.
//  * instead of declaring color like: ``` ${p => p.theme.palette.primary.main}; ```
//  * We can use shorthand like: ``` ${col.primary}; ``` or, more verbose: ``` ${p => col.primary()}; ```
//  */
export const smartCol = t => {
  const col = {};
  const contrast = {};
  if (t && t.palette) {
    const pal = { ...t.palette };
    Object.keys(pal).forEach(k => {
      if (pal[k].main) col[k] = () => pal[k].main;
      if (pal[k].contrastText) contrast[k] = () => pal[k].contrastText;
    });
  }
  return { col, contrast };
};

/**
 * Handy shortcut for styles components using breakpoints from theme.
 * instead of declaring things like: ``` @media screen and (min-width: ${p => p.theme.breakpoints.values.sm}px) {...} ```
 * We can use shorthand like: ``` @media screen and (min-width: ${mw.sm}px) {...} ``` or, more verbose: ``` @media screen and (min-width: ${p => mw.sm(p)}px) {...}; ```
 */
export const mw = {
  xs: p => p.theme.breakpoints.values.xs,
  sm: p => p.theme.breakpoints.values.sm,
  md: p => p.theme.breakpoints.values.md,
  lg: p => p.theme.breakpoints.values.lg,
  xl: p => p.theme.breakpoints.values.xl,
};

const defaultTheme = createTheme({});

export const getDefaultTheme = () => defaultTheme;

export const replaceDefaultFont = newFont => {
  const typo = { ...defaultTheme.typography };
  Object.keys(typo).forEach(k => {
    if (k === 'fontFamily') typo[k] = newFont;
    else if (typo[k].fontFamily) typo[k].fontFamily = newFont;
  });
  return typo;
};

// all these props should not be forwarded to DOM element when using styled on DOM element
const invalidDomProps = [
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'borderRadius',
  'boxShadow',
  'hoverMinWidth',
  'hoverMaxWidth',
  'hoverMinHeight',
  'hoverMaxHeight',
  'hoverBorderRadius',
  'hoverBoxShadow',
  'flat',
  'rowLength',
  'frozen',
  'fontSize',
  'lineHeight',
  'hoverLineHeight',
];

/**
 * Returns false if the prop is invalid and should not be forwarded.
 * @param {*} prop
 * @returns
 */
export const shouldForwardProp = prop => !invalidDomProps.includes(prop);
