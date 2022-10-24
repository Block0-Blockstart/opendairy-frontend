export const MuiTableRow = {
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      ...(ownerState.variant !== 'head' && {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.grey100.main,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }),
    }),
    variants: [
      {
        props: { variant: 'head' },
      },
    ],
  },
};
