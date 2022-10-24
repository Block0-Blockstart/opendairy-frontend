import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { Button } from '../../../shared';

export const StepFail = ({ next }) => (
  <>
    <Box display={'flex'} flexDirection={'column'} rowGap={'10px'}>
      <Typography mt={'30px'} width={'100%'} variant="h6" color={'error.main'}>
        There was a network error while validating your signature.
      </Typography>
      <Typography width={'100%'} variant="h6" color={'error.main'}>
        Please try again.
      </Typography>
    </Box>

    <Box mb={'10px'} width={'100%'} display={'flex'} justifyContent={'flex-end'}>
      <Button width={'20%'} onClick={next}>
        Exit
      </Button>
    </Box>
  </>
);

StepFail.propTypes = {
  next: PropTypes.func.isRequired,
};
