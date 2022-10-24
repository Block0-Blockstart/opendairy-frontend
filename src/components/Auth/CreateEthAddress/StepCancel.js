import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { Button } from '../../../shared';

export const StepCancel = ({ onClose, next }) => (
  <>
    <Box display={'flex'} flexDirection={'column'}>
      <Typography gutterBottom={true} variant="body">
        This will abort the signature creation process.
      </Typography>
      <Typography gutterBottom={true} variant="body">
        You can restart it later. But you will have to do it from scratch.
      </Typography>
    </Box>

    <Box
      mb={'10px'}
      width={'100%'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      rowGap={'20px'}>
      <Typography variant={'body'} fontWeight={'bold'} margin={'auto'}>
        Are you sure you want to cancel?
      </Typography>
      <Box width={'100%'} display={'flex'} justifyContent={'space-between'} columnGap={'20px'}>
        <Button fullWidth color={'error'} onClick={onClose}>
          I want to cancel
        </Button>
        <Button fullWidth onClick={next}>
          No, I continue
        </Button>
      </Box>
    </Box>
  </>
);

StepCancel.propTypes = {
  onClose: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
