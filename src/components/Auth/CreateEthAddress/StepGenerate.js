import { useEffect, useState } from 'react';
import { Wallet } from 'ethers';
import PropTypes from 'prop-types';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';

import { wait } from '../../../helpers/wait';
import { Button } from '../../../shared';

export const StepGenerate = ({ onClose, next, account, setAccount }) => {
  //starts true to avoid clipping
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  // Enforce waiting to allow loading display
  // Note: if we do not do this, the app will hang during wallet creation
  // because this is a synchronous function that is process consuming and
  // takes some time to return.
  useEffect(() => {
    if (account.ethAddress && account.privateKey && account.pubKey) {
      setLoading(false);
      return;
    }

    const waitWallet = async () => {
      setLoading(true);
      await wait(1000);
      const wallet = Wallet.createRandom();
      setAccount({ ethAddress: wallet.address, privateKey: wallet.privateKey, pubKey: wallet.publicKey });
      setLoading(false);
    };

    waitWallet();
  }, []);

  const handleCheck = e => {
    setErrorMessage('');
    setChecked(e.target.checked);
  };

  const handleNext = () => {
    if (checked) next();
    else setErrorMessage('Please check the box before continuing.');
  };

  const handleCloseSnack = (_e, _reason) => {
    // if (reason === 'clickaway') return;
    setOpenSnack(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(account.privateKey);
    setOpenSnack(true);
  };

  if (loading)
    return (
      <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Typography variant="body">
        This is your personal signature. Please ensure that it is stored in a <u>highly secure place</u>.
      </Typography>

      <Box
        minHeight={'90px'}
        borderRadius={'5px'}
        padding={'16px'}
        bgcolor={'altGrey100.main'}
        display={'flex'}
        alignItems={'flex-start'}
        columnGap={'12px'}>
        <Typography fontSize={'1.2rem'} fontFamily={'Consola'} sx={{ wordBreak: 'break-all' }}>
          {account.privateKey}
        </Typography>
        <Tooltip title={'Click to copy'}>
          <IconButton sx={{ marginTop: '-5px', marginRight: '-5px' }} onClick={handleCopyToClipboard}>
            <ContentCopyIcon sx={{ fontSize: '22px' }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box mb={'10px'} display={'flex'} flexDirection={'column'} rowGap={'20px'} width={'100%'}>
        <Typography width={'100%'} textAlign={'center'} height={'30px'} color={'error.main'} variant={'body2'}>
          {errorMessage}
        </Typography>
        <FormControl required={true} error={true}>
          <FormControlLabel
            labelPlacement={'end'}
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }}
            control={<Checkbox checked={checked} onChange={handleCheck} />}
            label="I hereby confirm that I am responsible of storing my signature. OpenDairy has no way of getting it back if it is lost or stolen."
          />
        </FormControl>
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'} columnGap={'20px'}>
          <Button fullWidth color={'error'} onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleCloseSnack}
        message="Copied to clipboard"
      />
    </>
  );
};

StepGenerate.propTypes = {
  onClose: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  setAccount: PropTypes.func.isRequired,
  account: PropTypes.exact({
    privateKey: PropTypes.string.isRequired,
    ethAddress: PropTypes.string.isRequired,
    pubKey: PropTypes.string,
  }).isRequired,
};
