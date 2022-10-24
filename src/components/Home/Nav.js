import { useNavigate } from 'react-router-dom';

import { AppBar, Box } from '@mui/material';

import { Button, ElevationScroll } from '../../shared';

import { GridDOM1, Toolbar1 } from './Nav.styles';

export const Nav = () => {
  const nav = useNavigate();
  return (
    <ElevationScroll>
      <AppBar>
        <Toolbar1>
          <Box
            display={'flex'}
            width={'100%'}
            height={'50px'}
            maxWidth={'1100px'}
            justifyContent={'space-between'}
            alignItems={'center'}
            margin={'30px auto'}
            padding={'0'}>
            <Box component={'img'} height={'100%'} maxWidth={'205px'} src="./assets/img/logo.svg" alt="OpenDairy" />
            <GridDOM1>
              <Button size={'medium'} onClick={() => nav('./signup')}>
                Sign Up
              </Button>
              <Button size={'medium'} variant={'outlined'} color={'dark'} onClick={() => nav('./login')}>
                Login
              </Button>
            </GridDOM1>
          </Box>
        </Toolbar1>
      </AppBar>
    </ElevationScroll>
  );
};
