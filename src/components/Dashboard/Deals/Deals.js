import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';

import { toIsoDate } from '../../../helpers/date';
import { sortObjectArray } from '../../../helpers/sort';
import { useUser } from '../../../hooks/useUser';
import { deals } from '../../../mock/data';
import { createTable } from '../../../mock/helpers';
import { schemaDeal } from '../../../mock/schemas';
import { Modal, TableHeadSortable } from '../../../shared';
import { CreateEthAddress } from '../../Auth';

export const Deals = () => {
  const rows = createTable(schemaDeal, deals);

  const headCells = [
    { label: 'Placed', key: 'placed' },
    { label: 'Offer Type', key: 'offerType' },
    { label: 'Product Spec', key: 'productSpec' },
    { label: 'Volume', key: 'volume' },
    { label: 'Departure', key: 'departure' },
    { label: 'Price', key: 'price' },
    { label: '', key: '' },
  ];

  const nav = useNavigate();
  const { user } = useUser();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('placed');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDocModal, setOpenDocModal] = useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleRequestSort = (_e, key) => {
    const isAsc = orderBy === key && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
  };

  const handleChangePage = (_e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleClickDoc = id => {
    if (user.ethAddress) nav(`/documents/${id}`);
    else setOpenDocModal(true);
  };

  return (
    <>
      <Modal width={'640px'} height={'500px'} open={openDocModal} closeButton={false}>
        <CreateEthAddress onClose={() => setOpenDocModal(false)} />
      </Modal>
      <TableContainer component={Paper} elevation={25}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHeadSortable order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headCells={headCells} />
          <TableBody>
            {sortObjectArray(rows, orderBy, order)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ id, placed, offerType, productSpec, volume, departure, price }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {toIsoDate(+placed)}
                  </TableCell>
                  <TableCell align="right">{offerType}</TableCell>
                  <TableCell align="right">{productSpec}</TableCell>
                  <TableCell align="right">{volume} </TableCell>
                  <TableCell align="right">{toIsoDate(+departure)}</TableCell>
                  <TableCell align="right">{price}</TableCell>
                  <TableCell align="right">
                    <Link color={'secondary'} underline={'none'} fontWeight={'bold'} onClick={() => handleClickDoc(id)}>
                      Deal documents
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && <TableRow style={{ height: (0.925 * 2 + 0.875) * emptyRows + 'rem' }} />}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
