import PropTypes from 'prop-types';

import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

/**
 * If headCell.key is missing, the items cannot be sorted using sort column tables
 */
export const TableHeadSortable = ({ order, orderBy, onRequestSort, headCells }) => {
  const createSortHandler = key => event => {
    onRequestSort(event, key);
  };

  return (
    <TableHead>
      <TableRow variant={'head'}>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={index === 0 ? 'left' : 'right'}
            sortDirection={orderBy === headCell.key ? order : false}>
            {headCell.key && (
              <TableSortLabel
                active={orderBy === headCell.key}
                direction={orderBy === headCell.key ? order : 'asc'}
                onClick={createSortHandler(headCell.key)}>
                {headCell.label || ''}
              </TableSortLabel>
            )}
            {!headCell.key && (headCell.label || '')}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeadSortable.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.arrayOf(PropTypes.exact({ label: PropTypes.string, key: PropTypes.string })),
};
