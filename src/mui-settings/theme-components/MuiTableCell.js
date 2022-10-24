export const cellHeight = 52;

export const MuiTableCell = {
  styleOverrides: {
    head: ({ theme }) => ({
      backgroundColor: theme.palette.light.main,
      color: theme.palette.grey800.main,
      padding: '0.5rem 1rem 0.6rem 1rem',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      fontWeight: '600',
      letterSpacing: '0',
      borderBottom: '3px solid ' + theme.palette.grey800.main,
    }),
    body: ({ theme }) => ({
      color: theme.palette.dark.main,
      padding: '0.625rem 1rem',
      fontSize: '0.875rem',
      lineHeight: '0.875rem',
      fontWeight: '500',
      letterSpacing: '0',
      height: cellHeight + 'px',
    }),
  },
};
