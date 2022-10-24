export const MuiTab = {
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      textTransform: 'none',
      fontSize: '0.8625rem',
      color: theme.palette[ownerState.color || 'primary'].main,
      letterSpacing: '0',
      fontWeight: '600',
      '&.Mui-selected': {
        color: theme.palette[ownerState.color || 'primary'].main,
      },
    }),
    selected: {
      /* this is bugged, instead, need to style this with the & syntax in root */
    },
  },
};
