import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FormLabel, OutlinedInput, Typography } from '@mui/material';
import { Box, FormControl } from '@mui/material';

import { useUser } from '../../../hooks/useUser';
import { createDocumentRequest, findAllUsers, getSchemaDocumentType } from '../../../services/documentService';
import { DatePicker, DropList, LoadingButton } from '../../../shared';

export const CreateRequest = ({ onClose }) => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentType, setDocumentType] = useState('');
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [privateKey, setPrivateKey] = useState();

  const { user } = useUser();

  const handleSet = (fn, value) => {
    setError('');
    fn(value);
  };

  //fetch documentTypes
  useEffect(() => {
    const req = async () => {
      setError('');
      setLoading(true);
      const dtRes = await getSchemaDocumentType();

      if (dtRes.error) {
        setError(dtRes.error.message);
        setLoading(false);
        return;
      }

      const parsed = Object.keys(dtRes.data).map(d => ({ id: d, value: dtRes.data[d], label: dtRes.data[d] }));
      setDocumentTypes(parsed);
      setLoading(false);
    };

    req();
  }, []);

  //fetch providers
  useEffect(() => {
    const req = async () => {
      setError('');
      setLoading(true);
      const pRes = await findAllUsers();

      if (pRes.error) {
        setError(pRes.error.message);
        setLoading(false);
        return;
      }

      const parsed = pRes.data
        .map(p => ({ id: p.ethAddress, value: p.id, label: p.id }))
        .filter(p => p.id && p.id !== user.ethAddress); // important !

      setProviders(parsed);
      setLoading(false);
    };

    req();
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!documentType || !provider || !privateKey) {
      setError('Missing fields.');
      setLoading(false);
      return;
    }

    if (privateKey.length !== 66) {
      setError('Signature length is not valid.');
      setLoading(false);
      return;
    }

    const timestamp = Date.parse(dueDate);

    if (timestamp < Date.now()) {
      setError('Due date should be in the future.');
      setLoading(false);
      return;
    }

    const res = await createDocumentRequest({ privateKey, deadline: timestamp, documentType, requestedToId: provider });
    if (res.error) {
      setError(res.error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    onClose();
  };

  return (
    <Box
      component={'form'}
      padding={'10px 50px'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      onSubmit={handleSubmit}>
      <Typography mb={'1rem'} variant={'h4'}>
        Request a document
      </Typography>

      <FormControl sx={{ mb: '0.6rem' }} fullWidth size="small">
        <FormLabel sx={{ mb: '0.4rem' }} id={'select-provider'} required={true}>
          Provider
        </FormLabel>
        <DropList disabled={loading} items={providers} value={provider} setValue={val => handleSet(setProvider, val)} />
      </FormControl>

      <FormControl sx={{ mb: '0.6rem' }} fullWidth size="small">
        <FormLabel sx={{ mb: '0.4rem' }} id={'select-dt'} required={true}>
          Document type
        </FormLabel>
        <DropList
          disabled={loading}
          items={documentTypes}
          value={documentType}
          setValue={val => handleSet(setDocumentType, val)}
        />
      </FormControl>

      <FormControl sx={{ mb: '0.6rem' }}>
        <FormLabel sx={{ mb: '0.4rem' }} required={false}>
          Due date (optional)
        </FormLabel>
        <DatePicker disabled={loading} value={dueDate} setValue={val => handleSet(setDueDate, val)} />
      </FormControl>

      <FormControl sx={{ mb: '0.6rem' }}>
        <FormLabel sx={{ mb: '0.4rem' }} required={true}>
          Your secret signature
        </FormLabel>
        <OutlinedInput
          multiline={true}
          rows={2}
          value={privateKey}
          onChange={e => handleSet(setPrivateKey, e.target.value)}
          sx={{
            wordBreak: 'break-all',
            padding: '12px',
            borderRadius: '5px',
            backgroundColor: 'light.main',
            fontSize: '1.05rem',
            fontFamily: 'Consola',
          }}
        />
      </FormControl>

      <Box height={'2rem'} ml={'5px'}>
        {error && (
          <Typography color={'error.main'} variant={'body2'}>
            {error}
          </Typography>
        )}
      </Box>

      <Box display={'flex'} justifyContent={'flex-end'}>
        <LoadingButton minWidth={'200px'} type="submit" loading={loading} variant="contained">
          Send Request
        </LoadingButton>
      </Box>
    </Box>
  );
};

CreateRequest.propTypes = { onClose: PropTypes.func.isRequired };
