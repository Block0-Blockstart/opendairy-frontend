import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, CircularProgress, OutlinedInput, Typography } from '@mui/material';

import { wait } from '../../../helpers/wait';
import { registerEthAccount } from '../../../services/userService';
import { Button } from '../../../shared';

export const StepConfirm = ({ onClose, next, account }) => {
  const { privateKey: generatedPrivateKey, pubKey, ethAddress } = account;
  const [loading, setLoading] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setErrorMessage('');
    if (privateKey !== generatedPrivateKey) {
      // we can immediately know if the error is bad copy paste...
      await wait(500);
      setErrorMessage('Invalid signature');
      setLoading(false);
    } else {
      const res = await registerEthAccount({ ethAddress, privateKey, pubKey });
      if (res.error) {
        //any other error is not retryable without restarting all the process
        console.error(res.error);
        setLoading(false);
        next(false);
      } else {
        setLoading(false);
        next(true);
      }
    }
  };

  if (loading)
    return (
      <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Box display={'flex'} flexDirection={'column'}>
        <Typography gutterBottom={true} variant="body">
          Please enter your signature in the box below and click {'"'}Confirm{'"'}.
        </Typography>
        <Typography gutterBottom={true} variant="body">
          This will allow us to associate the email address of your user account with your signature, so that we can
          link your identity to anything you sign afterwards.
        </Typography>
      </Box>

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
      <Typography width={'100%'} textAlign={'center'} height={'30px'} color={'error.main'} variant={'body2'}>
        {errorMessage}
      </Typography>

      <Box mb={'10px'} display={'flex'} flexDirection={'column'} rowGap={'20px'} width={'100%'}>
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'} columnGap={'20px'}>
          <Button fullWidth color={'error'} onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth onClick={handleClick}>
            Confirm
          </Button>
        </Box>
      </Box>
    </>
  );
};

StepConfirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  account: PropTypes.exact({
    privateKey: PropTypes.string.isRequired,
    ethAddress: PropTypes.string.isRequired,
    pubKey: PropTypes.string,
  }).isRequired,
};
