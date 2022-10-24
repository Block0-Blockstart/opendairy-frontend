import React, { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import { useUser } from '../../hooks/useUser';
import { Modal } from '../../shared';
import { CreateEthAddress } from '../Auth';

export const DocumentsIndex = () => {
  const { user } = useUser();
  const [openDocModal, setOpenDocModal] = useState(false);

  useEffect(() => {
    if (!user.ethAddress) setOpenDocModal(true);
  }, [user.ethAddress]);

  return (
    <>
      <Typography pt={'30px'} fontWeight={'700'} variant={'h5'}>
        Welcome to document manager.
      </Typography>
      <Typography pt={'30px'} fontWeight={'700'} variant={'h5'}>
        Please use your dashboard to find documents by deal.
      </Typography>

      <Modal width={'640px'} height={'500px'} open={openDocModal} closeButton={false}>
        <CreateEthAddress onClose={() => setOpenDocModal(false)} />
      </Modal>
    </>
  );
};
