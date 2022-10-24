import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { toIsoDate } from '../../../../helpers/date';

export const WaitingUpdate = ({ dr }) => {
  return (
    <Box padding={'10px 50px'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
      <Typography mb={'1rem'} variant={'h5'}>
        Waiting update
      </Typography>

      {dr.deadline && (
        <Typography mb={'1rem'} variant={'body'}>
          We requested a document of type <b>{dr.documentType}</b> on <b>{toIsoDate(+dr.requestDate)}</b>, with a
          deadline on <b>{toIsoDate(+dr.deadline)}</b>.
        </Typography>
      )}

      {!dr.deadline && (
        <Typography mb={'1rem'} variant={'body'}>
          We requested a document of type <b>{dr.documentType}</b> on <b>{toIsoDate(+dr.requestDate)}</b>.
        </Typography>
      )}

      <Typography mb={'1rem'} variant={'body'}>
        We rejected the last document submitted by the issuer in response to our request.
      </Typography>

      <Typography mb={'1rem'} variant={'body'}>
        {dr.documentDelivery.rejectionReason
          ? `We justified our rejection for this reason:`
          : 'We did not mention any specific reason for this rejection.'}
      </Typography>

      {dr.documentDelivery.rejectionReason && (
        <Typography mb={'1rem'} variant={'body'}>
          <i>{dr.documentDelivery.rejectionReason}</i>
        </Typography>
      )}
    </Box>
  );
};

WaitingUpdate.propTypes = {
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
