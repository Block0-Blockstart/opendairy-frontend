import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { download } from '../../../../helpers/download';
import { downloadDocument } from '../../../../services/documentService';
import { Button } from '../../../../shared';

export const Rejected = ({ dr }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async e => {
    e.preventDefault();
    setErrorMessage('');

    const res = await downloadDocument(dr.documentDelivery.id);

    if (res.error) {
      setErrorMessage(res.error.message);
    } else {
      download(res.data, res.responseHeaders);
    }
  };

  return (
    <Box
      padding={'10px 50px'}
      display={'flex'}
      height={'100%'}
      flexDirection={'column'}
      justifyContent={'space-between'}>
      <Typography mb={'1rem'} color={'error'} variant={'h5'}>
        Document rejected
      </Typography>

      <Box display={'flex'} flexDirection={'column'} rowGap={'1rem'}>
        <Typography mb={'1rem'} variant={'body'}>
          The document of type <b>{'" ' + dr.documentType + ' "'}</b> has been definitely rejected by the recipient.
        </Typography>
        <Typography mb={'1rem'} variant={'body'}>
          No more action is required.
        </Typography>
        <Typography mb={'1rem'} variant={'body'}>
          Do you want to download a certified copy of the rejected document?
        </Typography>
      </Box>

      <Box display={'flex'} minHeight={'30px'}>
        <Typography color={'error'} variant={'body'}>
          {errorMessage}
        </Typography>
      </Box>

      <Box display={'flex'} width={'50%'} margin={'0 auto 70px auto'}>
        <Button fullWidth color={'info'} onClick={handleDownload}>
          Download
        </Button>
      </Box>
    </Box>
  );
};

Rejected.propTypes = {
  dr: PropTypes.exact({
    id: PropTypes.string.isRequired,
    deadline: PropTypes.number,
    documentType: PropTypes.string.isRequired,
    requestDate: PropTypes.number.isRequired,
    requestedBy: PropTypes.exact({ id: PropTypes.string.isRequired }).isRequired,
    requestedTo: PropTypes.exact({ id: PropTypes.string.isRequired }).isRequired,
    documentDelivery: PropTypes.exact({
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      rejectionReason: PropTypes.string,
      sentDate: PropTypes.number.isRequired,
      verificationHash: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  }),
};
