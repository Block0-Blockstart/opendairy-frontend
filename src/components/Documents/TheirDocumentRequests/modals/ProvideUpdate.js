import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { toIsoDate } from '../../../../helpers/date';
import { Button } from '../../../../shared';

import { SendFile } from './SendFile/SendFile';

export const ProvideUpdate = ({ dr, onClose }) => {
  const [showSend, setShowSend] = useState(false);

  return (
    <Box
      padding={'10px 50px'}
      display={'flex'}
      height={'100%'}
      flexDirection={'column'}
      justifyContent={'space-between'}>
      <Typography mb={'1rem'} variant={'h5'}>
        Update document
      </Typography>

      {!showSend && (
        <>
          <Typography mb={'1rem'} variant={'body'}>
            A document of type <b>{'" ' + dr.documentType + ' "'}</b> has been requested by <b>{dr.requestedBy.id}</b>{' '}
            on <b>{toIsoDate(dr.requestDate)}</b>
            {dr.deadline && (
              <>
                , with a deadline on <b>{toIsoDate(+dr.deadline)}</b>
              </>
            )}
            .
          </Typography>
          <Typography mb={'1rem'} variant={'body'}>
            We have submitted the document on <b>{toIsoDate(+dr.documentDelivery.sentDate)}</b>, but the recipient has
            rejected it{dr.documentDelivery.rejectionReason && ', for this reason:'}
          </Typography>
          {dr.documentDelivery.rejectionReason && (
            <Typography mb={'1rem'} variant={'body'}>
              <i>{dr.documentDelivery.rejectionReason}</i>
            </Typography>
          )}

          <Typography mb={'1rem'} variant={'body'}>
            Do you want to update the document?
          </Typography>

          <Box mb={'30px'} display={'flex'} flexDirection={'column'} rowGap={'20px'} width={'100%'}>
            <Box width={'100%'} display={'flex'} justifyContent={'space-between'} columnGap={'20px'}>
              <Button fullWidth color={'info'} onClick={() => setShowSend(true)}>
                Yes
              </Button>
              <Button fullWidth onClick={onClose}>
                No
              </Button>
            </Box>
          </Box>
        </>
      )}

      {showSend && <SendFile drId={dr.id} onFinish={onClose} />}
    </Box>
  );
};

ProvideUpdate.propTypes = {
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
