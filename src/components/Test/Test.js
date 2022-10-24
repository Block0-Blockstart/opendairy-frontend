import { useState } from 'react';

import CircleIcon from '@mui/icons-material/Circle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import { Button as CustomBtn, Modal } from '../../shared';

import { ExampleModalContent } from './ExampleModalContent/ExampleModalContent';

export const CheckedRadioButton = () => {
  <>
    <CircleIcon sx={{ width: '22px', position: 'absolute', color: 'white', zIndex: '1' }} />
    <RadioButtonUncheckedIcon sx={{ width: '22px', zIndex: '2' }}></RadioButtonUncheckedIcon>
  </>;
};
export const UncheckedRadioButton = () => {
  <>
    <CircleIcon sx={{ width: '22px', position: 'absolute', color: 'white', zIndex: '1' }} />
    <RadioButtonCheckedIcon sx={{ width: '22px', color: 'grey', zIndex: '2' }} />
  </>;
};

export const WhiteBackgroundRadioButtonExample = () => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };
  <Box>
    <FormLabel required={true} id="document-type-label">
      Select Document Type
    </FormLabel>
    <RadioGroup
      aria-labelledby="document-type-label"
      value={value}
      onChange={handleChange}
      name="document-type-radio-button">
      <FormControlLabel
        value="invoice"
        control={<Radio icon={<UncheckedRadioButton />} unCheckedIcon={<CheckedRadioButton />} size="small"></Radio>}
        label="Invoice"></FormControlLabel>
    </RadioGroup>
  </Box>;
};

export const Test = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <Button color={'light'} onClick={handleOpen}>
          Open Modal
        </Button>
        <Modal width={'600px'} open={open} onClose={handleClose}>
          <ExampleModalContent></ExampleModalContent>
        </Modal>
      </div>

      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'10px'}>
        <Button>default</Button>
        <Button variant={'outlined'}>default outline</Button>

        <Button color={'primary'}>primary default</Button>
        <Button color={'secondary'}>secondary default</Button>
        <Button color={'dark'} width={'600px'}>
          dark fixed width 600
        </Button>
        <Button color={'primary'} size={'small'}>
          primary small
        </Button>
        <Button color={'primary'} size={'medium'}>
          primary medium
        </Button>
        <Button color={'primary'} size={'large'}>
          primary large
        </Button>
        <Button color={'primary'} variant={'contained'}>
          primary contained
        </Button>
        <Button color={'primary'} variant={'text'}>
          primary text
        </Button>
        <Button color={'primary'} variant={'outlined'}>
          primary outlined
        </Button>
        <Button color={'primary'} fullWidth>
          primary fullwidth
        </Button>
        <Button color={'secondary'} variant={'contained'}>
          secondary contained
        </Button>
        <Button color={'secondary'} variant={'outlined'}>
          secondary outlined
        </Button>
        <Button color={'dark'} variant={'contained'}>
          dark contained
        </Button>
        <Button color={'dark'} variant={'outlined'}>
          dark outlined
        </Button>

        <div>
          <Button color={'secondary'} variant={'contained'} size={'small'}>
            secondary contained small
          </Button>
          <Button color={'secondary'} variant={'outlined'} size={'small'}>
            secondary outlined small
          </Button>
        </div>
        <div>
          <Button color={'secondary'} variant={'contained'}>
            secondary contained
          </Button>
          <Button color={'secondary'} variant={'outlined'}>
            secondary outlined
          </Button>
        </div>
        <div>
          <Button color={'secondary'} variant={'contained'} size={'large'}>
            secondary contained large
          </Button>
          <Button color={'secondary'} variant={'outlined'} size={'large'}>
            secondary outlined large
          </Button>
        </div>
        <div>
          <CustomBtn flat color={'warning'} variant={'contained'} size={'large'}>
            custom warning contained large flat
          </CustomBtn>
          <CustomBtn flat color={'error'} variant={'outlined'} size={'large'}>
            custom error outlined large flat
          </CustomBtn>
        </div>
        <div>
          <CustomBtn color={'info'} variant={'text'} size={'large'}>
            custom info text large
          </CustomBtn>
          <CustomBtn frozen color={'dark'} variant={'outlined'} size={'large'}>
            custom dark outlined large frozen
          </CustomBtn>
        </div>
      </Box>
    </>
  );
};
