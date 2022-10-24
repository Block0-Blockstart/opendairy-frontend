import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.light.main,
    padding: '20px 10px',
    fontSize: '1rem',
    // borderBottom: '3px solid black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '20px 10px',
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey100.main,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
