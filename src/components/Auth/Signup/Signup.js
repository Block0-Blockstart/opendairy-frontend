import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { useUser } from '../../../hooks/useUser';
import { Button } from '../../../shared';

import { CheckboxCM1, GridDOM1, Input } from './Signup.styles';

export const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const nav = useNavigate();
  const { signup } = useUser();

  const handleSignup = async e => {
    e.preventDefault();
    const res = await signup({ email, password });
    if (res.error) {
      setErrorMessage(res.error.message);
    } else {
      setErrorMessage('');
      nav('/login');
    }
  };

  return (
    <Box display={'flex'} justifyContent={'center'} bgcolor={'primary.main'} color={'primary.contrastText'}>
      <form onSubmit={handleSignup}>
        <Box padding={'50px 15px 80px'} maxWidth={'1000px'}>
          <Box padding={'20px 40px 60px'} display={'flex'} justifyContent={'center'}>
            <Box component={'img'} maxHeight={'100px'} src="assets/img/logo2.svg" alt="" />
          </Box>
          <Typography gutterBottom={true} align={'center'} variant={'h4'}>
            Apply for an account
          </Typography>
          <Typography mb={'30px'} align={'center'} variant={'body2'}>
            Please fill out the complete form and we will setup an account for you.
          </Typography>
          <Input label={'Company *'} disabled={true} />
          <Input label={'Address *'} disabled={true} />
          <Input label={'Country *'} disabled={true} />
          <GridDOM1 rowLength={'3'}>
            <Input label={'Zip Code *'} disabled={true} />
            <Input label={'State *'} disabled={true} />
            <Input label={'City *'} disabled={true} />
          </GridDOM1>
          <Input label={'Phone number *'} disabled={true} />
          <Input label={'Company registration number *'} disabled={true} />
          <Typography gutterBottom={true} variant={'h4'} width={'100%'}>
            Please fill out your personal details
          </Typography>
          <GridDOM1 rowLength={'2'}>
            <Input label={'First Name *'} disabled={true} />
            <Input label={'Last Name *'} disabled={true} />
          </GridDOM1>
          <Input label={'Job title *'} disabled={true} />
          <Input label={'Mobile number *'} disabled={true} />
          <Input label={'Email *'} setValue={e => setEmail(e.target.value)} />
          <Input label={'Password *'} password={true} setValue={e => setPassword(e.target.value)} />
          <Typography variant={'h7'} fontWeight={'300'} color="red">
            {errorMessage}
          </Typography>
          <Typography>
            In order to use the OpenDairy platform you have to agree to our platform terms. You can download and review
            our terms here.
          </Typography>
          <Box display={'flex'} gap={'8px'} alignItems={'center'}>
            <CheckboxCM1 />
            <Typography>I agree to the OpenDairy platform terms*</Typography>
          </Box>
          <Button type="submit" color={'dark'} margin={'20px auto 10px'}>
            Send Application
          </Button>
        </Box>
      </form>
    </Box>
  );
};
