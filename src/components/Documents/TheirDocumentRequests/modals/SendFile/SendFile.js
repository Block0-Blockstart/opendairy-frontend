import React, { useCallback, useState } from 'react';
import { blake2bHex } from 'blakejs';
import { Buffer } from 'buffer/'; // '/' is important !
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import { CloudUpload } from '@mui/icons-material';
import { Box, CircularProgress, FormControl, FormLabel, OutlinedInput, Typography } from '@mui/material';

import { betterSizeToString } from '../../../../../helpers/filesize';
import { createDocumentDelivery } from '../../../../../services/documentService';
import { Button } from '../../../../../shared';

export const SendFile = ({ drId, setHasFile, onFinish }) => {
  const [hash, setHash] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const reset = () => {
    setErrorMessage('');
    setHash(0);
    setFile(null);
    if (setHasFile) setHasFile(false);
    setPrivateKey('');
    setLoading(false);
  };

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onloadstart = () => setLoading(true);

    reader.onloadend = () => setLoading(false);

    reader.onload = () => {
      try {
        const hashRes = blake2bHex(Buffer.from(reader.result), null, 12);
        setErrorMessage('');
        setHash(hashRes);
        setFile(acceptedFiles[0]);
        if (setHasFile) setHasFile(true);
      } catch (e) {
        console.error(e);
        setErrorMessage('Error while computing file hash.');
      }
    };

    reader.onerror = err => {
      console.error(err);
      setErrorMessage('Error while computing file hash.');
    };

    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    const res = await createDocumentDelivery({
      privateKey,
      documentRequestId: drId,
      verificationHash: hash,
      file,
    });

    if (res.error) {
      setErrorMessage(res.error.message);
      setLoading(false);
    } else {
      setLoading(false);
      if (onFinish) onFinish();
    }
  };

  if (loading)
    return (
      <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      component={'form'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      height={'100%'}
      onSubmit={handleSubmit}>
      {!file && (
        <Box display={'flex'} flex={1} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Box
            {...getRootProps()}
            sx={{ cursor: 'pointer' }}
            display={'flex'}
            width={'80%'}
            margin={'0 auto 1rem auto'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            bgcolor={'#f6f6f6'}
            border={'2px dashed'}
            borderColor={'#b0b0b0'}
            borderRadius={'15px'}>
            <input {...getInputProps()} />
            <CloudUpload sx={{ fontSize: '120px', color: '#444' }} />
            <Typography textAlign={'center'} color={'secondary.main'} mb={'1rem'}>
              Drop your file here
              <br />
              or click to browse your computer
            </Typography>
          </Box>
          <Typography width={'100%'} textAlign={'center'} height={'30px'} color={'error.main'} variant={'body2'}>
            {errorMessage}
          </Typography>
        </Box>
      )}

      {file && (
        <>
          <Box display={'grid'} gridTemplateColumns={'1fr 2fr'} rowGap={'0.5rem'} mb={'2rem'}>
            <Typography variant={'body'}>File:</Typography>
            <Typography variant={'body'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>
              {file.name}
            </Typography>

            <Typography variant={'body'}>File size:</Typography>
            <Typography variant={'body'}>{betterSizeToString(file.size)}</Typography>

            <Typography variant={'body'}>File type:</Typography>
            <Typography variant={'body'}>{file.type}</Typography>

            <Typography variant={'body'}>File last modified:</Typography>
            <Typography variant={'body'}>{new Date(file.lastModified).toLocaleString()}</Typography>

            <Typography variant={'body'}>File hash:</Typography>
            <Typography variant={'body'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>
              {hash}
            </Typography>
          </Box>
          <FormControl sx={{ mb: '0.6rem' }}>
            <FormLabel sx={{ mb: '0.4rem' }} required={true}>
              Your secret signature
            </FormLabel>
            <OutlinedInput
              multiline={true}
              rows={2}
              value={privateKey}
              onChange={e => setPrivateKey(e.target.value)}
              sx={{
                wordBreak: 'break-all',
                padding: '12px',
                borderRadius: '5px',
                backgroundColor: 'altGrey100.main',
                fontSize: '1.1rem',
                fontFamily: 'Consola',
              }}
            />
          </FormControl>
          <Typography width={'100%'} textAlign={'center'} height={'30px'} color={'error.main'} variant={'body2'}>
            {errorMessage}
          </Typography>

          <Box width={'100%'} display={'flex'} justifyContent={'space-between'} columnGap={'20px'}>
            <Button type="button" fullWidth color={'error'} onClick={reset}>
              Choose another file
            </Button>
            <Button type="submit" fullWidth>
              Submit this file
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

SendFile.propTypes = { drId: PropTypes.string.isRequired, setHasFile: PropTypes.func, onFinish: PropTypes.func };
