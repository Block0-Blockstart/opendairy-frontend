import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { Button } from '../../../shared';

export const StepInit = ({ onClose, next }) => (
  <>
    <Typography variant="body">
      This feature is provided with enhanced traceability, provided by a professional, business-dedicated blockchain.
    </Typography>

    <Typography variant="body">
      To use this feature, you need a secret signature, which will be required each time you send, accept or reject a
      document.
    </Typography>

    <Typography variant="body" color={'error.main'}>
      IMPORTANT: your secret signature is 100% private. You must keep it secret. We do not store it anywhere. If you
      lose it, we cannot retrieve it for you.
    </Typography>

    <Box
      mb={'10px'}
      width={'100%'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      rowGap={'20px'}>
      <Typography variant={'body'} margin={'auto'}>
        Do you want to create your secret signature now?
      </Typography>
      <Box width={'100%'} display={'flex'} justifyContent={'space-between'} columnGap={'20px'}>
        <Button fullWidth color={'error'} onClick={onClose}>
          No
        </Button>
        <Button fullWidth onClick={next}>
          Yes
        </Button>
      </Box>
    </Box>
  </>
);

StepInit.propTypes = {
  onClose: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
