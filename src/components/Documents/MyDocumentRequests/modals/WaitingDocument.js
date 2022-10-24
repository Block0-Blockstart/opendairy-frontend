import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { toIsoDate } from '../../../../helpers/date';

export const WaitingDocument = ({ dr }) => {
  return (
    <Box padding={'10px 50px'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
      <Typography mb={'1rem'} variant={'h5'}>
        Waiting document
      </Typography>

      {dr.deadline && (
        <Typography mb={'1rem'} variant={'body'}>
          We requested a document of type <b>{'" ' + dr.documentType + ' "'}</b> on <b>{toIsoDate(+dr.requestDate)}</b>,
          with a deadline on <b>{toIsoDate(+dr.deadline)}</b>.
        </Typography>
      )}

      {!dr.deadline && (
        <Typography mb={'1rem'} variant={'body'}>
          We requested a document of type <b>{'" ' + dr.documentType + ' "'}</b> on <b>{toIsoDate(+dr.requestDate)}</b>.
        </Typography>
      )}

      <Typography mb={'1rem'} variant={'body'}>
        The provider has not yet answered.
      </Typography>

      <Typography mb={'1rem'} variant={'body'}>
        No action is required from us.
      </Typography>
    </Box>
  );
};

// No DD on a DR, but PropTypes fails if we omit DD ?!?
WaitingDocument.propTypes = {
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
