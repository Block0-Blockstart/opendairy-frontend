import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { toIsoDate } from '../../../../helpers/date';
import { download } from '../../../../helpers/download';
import { downloadDocument } from '../../../../services/documentService';
import { Button } from '../../../../shared';

export const Accepted = ({ dr }) => {
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
      <Typography mb={'1rem'} variant={'h5'}>
        Document accepted
      </Typography>

      <Box display={'flex'} flexDirection={'column'} rowGap={'1rem'}>
        <Typography variant={'body'}>
          We have accepted the document of type <b>{'" ' + dr.documentType + ' "'}</b>, submitted on{' '}
          <b>{toIsoDate(dr.documentDelivery.sentDate)}</b>.
        </Typography>

        <Typography variant={'body'}>No more action is required.</Typography>

        <Typography variant={'body'}>Do you want to download a certified copy of the approved document?</Typography>
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

Accepted.propTypes = {
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
