import React, { useRef, useState } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';

import { toIsoDate } from '../../../helpers/date';
import { sortObjectArray } from '../../../helpers/sort';
import { useDocumentRequest } from '../../../hooks/useDocumentRequest';
import { cellHeight } from '../../../mui-settings/theme-components/MuiTableCell';
import { Button, Modal, TableHeadSortable } from '../../../shared';
import { DocumentDeliveryStatus } from '../documentDeliveryStatus';

import { Accepted, Provide, ProvideUpdate, Rejected, WaitingAcception } from './modals';

export const TheirDocumentRequests = () => {
  const { theirDrs: rows, refresh } = useDocumentRequest();

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('requestDate');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openAccepted, setOpenAccepted] = useState(false);
  const [openRejected, setOpenRejected] = useState(false);
  const [openProvide, setOpenProvide] = useState(false);
  const [openProvideUpdate, setOpenProvideUpdate] = useState(false);
  const [openWaitingAcception, setOpenWaitingAcception] = useState(false);

  const currentDr = useRef({
    deadline: 0,
    documentType: '',
    id: '',
    requestDate: 0,
    requestedBy: { id: '' },
    requestedTo: { id: '' },
    documentDelivery: undefined,
  });

  const openButton = (row, openFn) => (
    <Button
      size={'tiny'}
      onClick={() => {
        currentDr.current = row;
        openFn(true);
      }}>
      Actions
    </Button>
  );

  const preparedRows = rows.map(row => {
    // no DD, so no status.
    if (!row.documentDelivery) {
      return { ...row, statusDisplay: 'Requested document', actionButton: openButton(row, setOpenProvide) };
    }
    //else
    switch (row.documentDelivery.status) {
      case DocumentDeliveryStatus.ACCEPTED:
        return { ...row, statusDisplay: 'Accepted', actionButton: openButton(row, setOpenAccepted) };
      case DocumentDeliveryStatus.REJECTED:
        return { ...row, statusDisplay: 'Rejected', actionButton: openButton(row, setOpenRejected) };
      case DocumentDeliveryStatus.TO_BE_REVIEWED:
        return { ...row, statusDisplay: 'Waiting acception', actionButton: openButton(row, setOpenWaitingAcception) };
      case DocumentDeliveryStatus.UPDATE_REQUIRED:
        return { ...row, statusDisplay: 'Requested update', actionButton: openButton(row, setOpenProvideUpdate) };
      default:
        throw new Error('Unknown state for Document Delivery');
    }
  });

  // modals that can mutate DR must trigger refresh
  const closeProvide = (e, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpenProvide(false);
      refresh();
    }
  };

  const closeProvideUpdate = (e, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpenProvideUpdate(false);
      refresh();
    }
  };

  const closeWaitingAcception = (e, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpenWaitingAcception(false);
      refresh();
    }
  };

  const headCells = [
    { label: 'Document Type', key: 'documentType' },
    { label: 'Requested by', key: 'requestedBy' },
    { label: 'Request date', key: 'requestDate' },
    { label: 'Deadline', key: 'deadline' },
    { label: 'Status', key: 'status' },
    { label: '', key: '' },
  ];

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

  return (
    <>
      <TableContainer component={Paper} elevation={25}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHeadSortable order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headCells={headCells} />

          <TableBody>
            {sortObjectArray(preparedRows, orderBy, order)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.documentType}
                  </TableCell>
                  <TableCell align="right">{row.requestedBy.id}</TableCell>
                  <TableCell align="right">{toIsoDate(+row.requestDate)}</TableCell>
                  <TableCell align="right">{row.deadline ? toIsoDate(+row.deadline) : '-'}</TableCell>
                  <TableCell align="right">{row.statusDisplay} </TableCell>
                  <TableCell align="right">{row.actionButton} </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && <TableRow style={{ height: cellHeight * emptyRows + 'px' }} />}
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

      <Modal width={'640px'} height={'500px'} open={openAccepted} onClose={() => setOpenAccepted(false)}>
        <Accepted dr={currentDr.current} />
      </Modal>

      <Modal width={'640px'} height={'500px'} open={openRejected} onClose={() => setOpenRejected(false)}>
        <Rejected dr={currentDr.current} />
      </Modal>

      <Modal width={'640px'} height={'500px'} open={openProvide} onClose={closeProvide}>
        <Provide dr={currentDr.current} onClose={closeProvide} />
      </Modal>

      <Modal width={'640px'} height={'500px'} open={openProvideUpdate} onClose={closeProvideUpdate}>
        <ProvideUpdate dr={currentDr.current} onClose={closeProvideUpdate} />
      </Modal>

      <Modal width={'640px'} height={'500px'} open={openWaitingAcception} onClose={closeWaitingAcception}>
        <WaitingAcception dr={currentDr.current} onClose={closeWaitingAcception} />
      </Modal>
    </>
  );
};
