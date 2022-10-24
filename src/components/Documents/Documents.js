import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Tab, Tabs, Typography } from '@mui/material';

import { useDocumentRequest } from '../../hooks/useDocumentRequest';
import { Button, Modal, TabPanel } from '../../shared';

import { CreateRequest } from './modals/CreateRequest';
import { MyDocumentRequests } from './MyDocumentRequests/MyDocumentRequests';
import { TheirDocumentRequests } from './TheirDocumentRequests/TheirDocumentRequests';

export const Documents = () => {
  const params = useParams();
  const dealId = params.dealId;

  const { refresh } = useDocumentRequest();
  const [value, setValue] = useState(0);
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);

  const onClose = (e, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setIsCreateRequestOpen(false);
      refresh();
    }
  };

  const handleChange = (_e, newValue) => setValue(newValue);

  const a11yProps = index => ({ id: `tab-${index}`, 'aria-controls': `tabpan-${index}` });

  return (
    <>
      <Box p={'20px 0 10px'} display={'flex'} columnGap={'10px'} justifyContent={'space-between'}>
        <Typography fontWeight={'700'} variant={'h5'}>
          Documents for deal ID: {dealId}
        </Typography>
        <Button onClick={() => setIsCreateRequestOpen(true)}>Create document request</Button>
      </Box>

      <Box padding={'10px 0'}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab color={'dark'} label="My Documents Requests" {...a11yProps(0)} />
          <Tab color={'dark'} label="Their Documents Requests" {...a11yProps(1)} />
        </Tabs>
        <Box>
          <TabPanel value={value} index={0}>
            <MyDocumentRequests />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TheirDocumentRequests />
          </TabPanel>
        </Box>
      </Box>

      <Modal
        backgroundColor={'grey100.main'}
        width={'640px'}
        height={'560px'}
        open={isCreateRequestOpen}
        onClose={onClose}>
        <CreateRequest onClose={onClose} />
      </Modal>
    </>
  );
};
