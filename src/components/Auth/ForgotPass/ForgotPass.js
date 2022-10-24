import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { Button } from '../../../shared/Button';

import { Input, PaperCM1 } from './ForgotPass.styles';

export const ForgotPass = () => {
  const nav = useNavigate();

  const handleSubmit = _e => {
    //do something
    console.log('Form Submitted !');
    nav('/login');
  };

  const handleBack = e => {
    e.preventDefault();
    nav(-1);
  };

  return (
    <Box width={'100%'} maxWidth={'100%'} minHeight={'100%'} padding={'0 40px'} bgcolor={'altGrey100.main'}>
      <Box padding={'20px 0'} lineHeight={'0'}>
        <Box
          component={'img'}
          height={'30px'}
          margin={'0'}
          padding={'0'}
          lineHeight={'0'}
          boxSizing={'border-box'}
          src="./assets/img/logo1.png"
          alt=""
        />
      </Box>
      <PaperCM1 elevation={25}>
        <form onSubmit={handleSubmit}>
          <Box width={'100%'} display={'flex'} flexDirection={'column'}>
            <Typography mb={'1.25rem'} variant={'h5'} lineHeight={'1.5896rem'} fontWeight={'600'}>
              Forgot password
            </Typography>
            <Typography mb={'1.25rem'} variant={'body'}>
              Please enter the email address you signed up with and press submit.
              <br />
              Instructions on how to reset your password will be emailed to you.
            </Typography>
            <Input label={'email *'} />
          </Box>
          <Box display={'flex'} margin={'0'} gap={'10px'}>
            <Button type="submit" minWidth={'120px'} size={'small'}>
              Submit
            </Button>
            <Button type="button" frozen minWidth={'120px'} variant={'outlined'} size={'small'} onClick={handleBack}>
              Back
            </Button>
          </Box>
        </form>
      </PaperCM1>
    </Box>
  );
};
