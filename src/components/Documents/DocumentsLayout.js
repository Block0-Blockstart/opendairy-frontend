import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import { useUser } from '../../hooks/useUser';
import { Button, ElevationScroll } from '../../shared';

export const DocumentsLayout = () => {
  const nav = useNavigate();

  const { user, logout } = useUser();

  return (
    <Box display={'flex'} flexDirection={'column'} minHeight={'100%'}>
      <ElevationScroll>
        <AppBar sx={{ backgroundColor: 'dark.main', padding: '0 30px' }}>
          <Toolbar sx={{ width: '100%', padding: { xs: '0' }, margin: '0', height: '64px' }}>
            <Box
              display={'flex'}
              width={'100%'}
              height={'64px'}
              justifyContent={'space-between'}
              alignItems={'center'}
              margin={'0 auto'}
              padding={'0'}>
              <Box
                component={'img'}
                margin={'0'}
                padding={'0'}
                boxSizing={'border-box'}
                width={'100%'}
                maxWidth={'130px'}
                src="../assets/img/logo-white.svg"
                alt=""
              />
              <Box
                display={'flex'}
                justifyContent={'space-evenly'}
                alignItems={'center'}
                margin={'0'}
                padding={'0'}
                columnGap={'1rem'}>
                <Button
                  onClick={() => nav('/dashboard/offers', { state: { tabValue: 0 } })}
                  size={'medium'}
                  variant={'text'}
                  color={'light'}>
                  Back to dashboard
                </Button>
                <Typography fontSize={'0.825rem'} color={'altGrey100'}>
                  {user.email}
                </Typography>
                <Button size={'medium'} variant={'outlined'} color={'light'} onClick={() => logout()}>
                  Logout
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Box bgcolor={'altGrey100.main'} flex={'1'} width={'100%'} p={'64px 30px 0'}>
        <Outlet />
      </Box>
    </Box>
  );
};
