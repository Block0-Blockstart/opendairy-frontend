import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Box, Link, Typography } from '@mui/material';

import { useUser } from '../../../hooks/useUser';
import { Button } from '../../../shared/Button';

import { CheckboxCM1, Input, PaperCM1 } from './Login.styles';

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const nav = useNavigate();

  const { login, error } = useUser();

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password });
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
            <Typography mb={'1.5rem'} variant={'h5'} fontWeight={'700'}>
              Log in to OpenDairy
            </Typography>
            <Input label={'email *'} setValue={e => setEmail(e.target.value)} />
            <Input label={'password *'} setValue={e => setPassword(e.target.value)} password={true} />
          </Box>
          <Link
            underline={'none'}
            color={'secondary'}
            fontWeight={'bold'}
            display={'block'}
            marginBottom={'0.5rem'}
            onClick={() => nav('/forgot-pass')}>
            Forgot password?
          </Link>
          <Box mb={'22px'} display={'flex'} gap={'8px'} alignItems={'center'}>
            <CheckboxCM1 />
            <Typography pb={'0.1rem'}>Remember me on this computer</Typography>
          </Box>
          <Button type="submit" minWidth={'120px'} size={'small'}>
            Log in
          </Button>
          <Box mt={'0.5rem'}>
            <Typography variant={'h7'} fontWeight={'300'} color="red">
              {error !== 'No token supplied' && error !== 'Forbidden resource' ? error : null}
            </Typography>
          </Box>
        </form>
      </PaperCM1>
    </Box>
  );
};

Login.propTypes = {
  handleLogClick: PropTypes.func,
  handleSignUpClick: PropTypes.func,
  handleForgotPasswordClick: PropTypes.func,
};
