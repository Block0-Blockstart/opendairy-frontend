import { Backdrop, CircularProgress } from '@mui/material';

export const Loading = () => (
  <Backdrop open={true} sx={{ color: '#000' }} invisible={true}>
    <CircularProgress color="inherit" />
  </Backdrop>
);
