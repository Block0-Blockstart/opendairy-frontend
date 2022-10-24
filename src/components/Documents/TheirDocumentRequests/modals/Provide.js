import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { toIsoDate } from '../../../../helpers/date';

import { SendFile } from './SendFile/SendFile';

export const Provide = ({ dr, onClose }) => {
  const [hasFile, setHasFile] = useState(false);

  return (
    <Box padding={'10px 50px'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} height={'100%'}>
      <Typography mb={'2rem'} variant={'h5'}>
        Provide document
      </Typography>

      {!hasFile && (
        <Typography mb={'1rem'} variant={'body'}>
          A document of type <b>{'" ' + dr.documentType + ' "'}</b> has been requested by <b>{dr.requestedBy.id}</b> on{' '}
          <b>{toIsoDate(dr.requestDate)}</b>. You can deliver it using the box below.
        </Typography>
      )}

      <SendFile drId={dr.id} setHasFile={setHasFile} onFinish={onClose} />
    </Box>
  );
};

// No DD on a DR, but PropTypes fails if we omit DD ?!?
Provide.propTypes = {
  onClose: PropTypes.func.isRequired,
  dr: PropTypes.exact({
    id: PropTypes.string.isRequired,
    deadline: PropTypes.number,
    documentType: PropTypes.string.isRequired,
    requestDate: PropTypes.number.isRequired,
    requestedBy: PropTypes.exact({ id: PropTypes.string.isRequired }).isRequired,
    requestedTo: PropTypes.exact({ id: PropTypes.string.isRequired }).isRequired,
    documentDelivery: PropTypes.any,
  }),
};
