import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { AnimCheck, Button } from '../../../shared';

export const StepSuccess = ({ next }) => (
  <>
    <Box display={'flex'} flexDirection={'column'}>
      <AnimCheck size={128} color={'#87ae35'} />
      <Typography mt={'-20px'} width={'100%'} textAlign={'center'} variant="h5">
        Your signature is validated.
      </Typography>
    </Box>

    <Box mb={'10px'} width={'100%'} display={'flex'} justifyContent={'flex-end'}>
      <Button width={'20%'} onClick={next}>
        Ok
      </Button>
    </Box>
  </>
);

StepSuccess.propTypes = {
  onClose: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
