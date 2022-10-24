import { useState } from 'react';

import { Box, Tab, Tabs, Typography } from '@mui/material';

import { Button, TabPanel } from '../../../shared';
import { Deals } from '../Deals/Deals';

const a11yProps = index => ({ id: `tab-${index}`, 'aria-controls': `tabpan-${index}` });

export const Offers = () => {
  const [value, setValue] = useState(2);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        bgcolor={'altGrey100.main'}
        p={'20px 0 10px'}
        display={'flex'}
        columnGap={'10px'}
        justifyContent={'space-between'}>
        <Typography fontWeight={'700'} variant={'h5'}>
          On-spec offers {'&'} deals of our company
        </Typography>
        <Button>Create Offer</Button>
      </Box>
      <Box padding={'10px 0'}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab color={'dark'} label="Active offers" {...a11yProps(0)} />
          <Tab color={'dark'} label="Archived offers" {...a11yProps(1)} />
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
