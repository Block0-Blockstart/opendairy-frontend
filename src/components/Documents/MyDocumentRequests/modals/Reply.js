import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, FormControl, FormLabel, OutlinedInput, Typography } from '@mui/material';

import { download } from '../../../../helpers/download';
import {
  acceptDocumentDelivery,
  askUpdateDocumentDelivery,
  downloadDocument,
} from '../../../../services/documentService';
import { Button, DropList, LoadingButton } from '../../../../shared';

const actions = {
  ACCEPT: 'Accept',
  ASK_UPDATE: 'Ask update',
};

const actionsList = [
  { id: 1, value: actions.ACCEPT, label: actions.ACCEPT },
  { id: 2, value: actions.ASK_UPDATE, label: actions.ASK_UPDATE },
];

export const Reply = ({ dr, onClose }) => {
  const [privateKey, setPrivateKey] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [action, setAction] = useState(actions.ACCEPT);

  const handleDownload = async e => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const res = await downloadDocument(dr.documentDelivery.id);

    if (res.error) {
      setErrorMessage(res.error.message);
    } else {
      download(res.data, res.responseHeaders);
    }
    setLoading(false);
  };

  const handleSubmit = e => (action === actions.ACCEPT ? handleAccept(e) : handleAskUpdate(e));

  const handleAccept = async e => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const res = await acceptDocumentDelivery({ privateKey, documentDeliveryId: dr.documentDelivery.id });

    if (res.error) {
      setErrorMessage(res.error.message);
      setLoading(false);
    } else {
      setLoading(false);
      setDone(true);
    }
  };

  const handleAskUpdate = async e => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const res = await askUpdateDocumentDelivery({
      privateKey,
      documentDeliveryId: dr.documentDelivery.id,
      rejectionReason,
    });

    if (res.error) {
      setErrorMessage(res.error.message);
      setLoading(false);
    } else {
      setLoading(false);
      setDone(true);
    }
  };

  const _handleReject = async () => {
    console.log('Not implemented');
  };

  return (
    <Box padding={'10px 50px'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
      <Box mb={'1rem'} width={'100%'} display={'flex'} columnGap={'20px'} justifyContent={'flex-start'}>
        <Typography variant={'h5'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>
          {dr.documentType}
        </Typography>

        <Button type="button" color={'info'} size={'tiny'} onClick={handleDownload}>
          Download
        </Button>
      </Box>

      {!done && (
        <Box
          component={'form'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'flex-start'}
          onSubmit={handleSubmit}>
          <FormControl sx={{ mb: '0.6rem' }} fullWidth size="small">
            <FormLabel sx={{ mb: '0.4rem' }} id={'select-action'} required={true}>
              Action
            </FormLabel>
            <DropList disabled={loading} items={actionsList} value={action} setValue={setAction} />
          </FormControl>

          {action === actions.ASK_UPDATE && (
            <FormControl sx={{ mb: '0.6rem' }}>
              <FormLabel sx={{ mb: '0.4rem' }} required={true}>
                Explain shortly why you want an update:
              </FormLabel>
              <OutlinedInput
                multiline={true}
                rows={3}
                value={rejectionReason}
                onChange={e => setRejectionReason(e.target.value)}
                sx={{
                  wordBreak: 'break-all',
                  padding: '12px',
                  borderRadius: '5px',
                  backgroundColor: 'altGrey100.main',
                  fontSize: '0.95rem',
                }}
              />
            </FormControl>
          )}

          <FormControl sx={{ mb: '0.6rem' }}>
            <FormLabel sx={{ mb: '0.4rem' }} required={true}>
              Your secret signature
            </FormLabel>
            <OutlinedInput
              multiline={true}
              rows={2}
              value={privateKey}
              onChange={e => setPrivateKey(e.target.value)}
              sx={{
                wordBreak: 'break-all',
                padding: '12px',
                borderRadius: '5px',
                backgroundColor: 'altGrey100.main',
                fontSize: '1.1rem',
                fontFamily: 'Consola',
              }}
            />
          </FormControl>

          <Typography width={'100%'} textAlign={'center'} height={'30px'} color={'error.main'} variant={'body2'}>
            {errorMessage}
          </Typography>

          <Box display={'flex'} justifyContent={'flex-end'}>
            <LoadingButton minWidth={'200px'} type="submit" loading={loading} variant="contained">
              Submit
            </LoadingButton>
          </Box>
        </Box>
      )}

      {done && (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} rowGap={'20px'}>
          <Typography variant={'h5'} color={'primary.main'} textAlign={'center'}>
            Success
          </Typography>
          <Button size={'medium'} onClick={onClose}>
            OK
          </Button>
        </Box>
      )}
    </Box>
  );
};

Reply.propTypes = {
  onClose: PropTypes.func.isRequired,
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
