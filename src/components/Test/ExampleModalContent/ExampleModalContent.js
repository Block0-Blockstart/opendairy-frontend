import { Box, Button, Checkbox, styled, Typography } from '@mui/material';

import { col } from '../../../mui-settings';

const CheckboxCM1 = styled(Checkbox)`
  color: ${col.primary};
  padding: 0;

  .MuiSvgIcon-root {
    font-size: 1.2rem;
  }
`;
export const ExampleModalContent = () => {
  const labelText =
    'I understand that if the seller accepts my bid I am obligated to purchase this product at the entreprise price.';
  return (
    <>
      <Typography gutterBottom={true} variant="h4">
        You are about to place a counterbid!
      </Typography>
      <Typography gutterBottom={true} variant="body2">
        You propose something different than the offer, so the seller will need to review your bid manually.
      </Typography>
      <Box sx={{ height: '300px' }}></Box>
      <Box pb={'20px'}>
        <Box display={'flex'} gap={'8px'} alignItems={'center'}>
          <CheckboxCM1 />
          <Typography variant={'body2'}>{labelText}</Typography>
        </Box>
      </Box>
      <Box>
        <Button> Place my bid</Button>
        <Button sx={{ marginRight: '15px' }} variant={'outlined'}>
          Back to offer
        </Button>
      </Box>
    </>
  );
};
