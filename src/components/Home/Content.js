import { Box } from '@mui/material';

export const Content = () => {
  return (
    <Box
      height={'100%'}
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      padding={'150px 40px 40px'}>
      <Box component={'img'} height={'70%'} maxWidth={'100%'} src="./assets/img/home.svg" alt="" />
    </Box>
  );
};
