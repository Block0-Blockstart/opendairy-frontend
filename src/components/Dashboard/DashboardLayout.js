import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import { useUser } from '../../hooks/useUser';
import { Button, ElevationScroll } from '../../shared';

import { Tab1, Tabs1 } from './DashboardLayout.styles';

const a11yProps = index => ({ id: `tab-${index}`, 'aria-controls': `tabpan-${index}` });

export const DashboardLayout = () => {
  const { user, logout } = useUser();
  const nav = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue((location.state && location.state.tabValue) || 0);
  }, []);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
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
                <Tabs1 value={value} onChange={handleChange} aria-label="tabs">
                  <Tab1 color={'light'} label="Offers" {...a11yProps(0)} onClick={() => nav('offers')} />
                  <Tab1 color={'light'} label="Auctions" {...a11yProps(1)} onClick={() => nav('auctions')} />
                  <Tab1 color={'light'} label="RFP" {...a11yProps(2)} onClick={() => nav('rfp')} />
                </Tabs1>
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
      <Box bgcolor={'altGrey100.main'} minHeight={'100%'} width={'100%'} p={'64px 30px 0'}>
        <Outlet />
      </Box>
    </>
  );
};
