import { useState } from 'react';

import { Box, Tab, Tabs, Typography } from '@mui/material';

import { Button, TabPanel } from '../../../shared';
import { Deals } from '../Deals/Deals';

const a11yProps = index => ({ id: `tab-${index}`, 'aria-controls': `tabpan-${index}` });

export const Auctions = () => {
  const [value, setValue] = useState(2);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box p={'20px 0 10px'} display={'flex'} columnGap={'10px'} justifyContent={'space-between'}>
        <Typography fontWeight={'700'} variant={'h5'}>
          Auctions by our company
        </Typography>
        <Button>Create Offer</Button>
      </Box>

      <Box padding={'10px 0'}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab color={'dark'} label="Active auctions" {...a11yProps(0)} />
          <Tab color={'dark'} label="Archived auctions" {...a11yProps(1)} />
          <Tab color={'dark'} label="Deals" {...a11yProps(2)} />
        </Tabs>
        <Box>
          <TabPanel value={value} index={0}>
            <Typography color={'#8e8e8e'} variant={'h3'}>
              Not in this demo
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography color={'#8e8e8e'} variant={'h3'}>
              Not in this demo
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Deals />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};
