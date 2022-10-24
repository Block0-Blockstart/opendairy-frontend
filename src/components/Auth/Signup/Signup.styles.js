import React from 'react';
import PropTypes from 'prop-types';

import { Box, Checkbox, FormHelperText, OutlinedInput } from '@mui/material';
import { styled } from '@mui/system';

import { col, shouldForwardProp } from '../../../mui-settings';

export const GridDOM1 = styled('div', { shouldForwardProp: shouldForwardProp })`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${p => p.rowLength}, 1fr);
  column-gap: 5px;
`;

const FormHelperText1 = styled(FormHelperText)`
  font-size: 1rem;
  color: ${col.light};
  margin: 0 0 8px 0;
`;

const OutlinedInput1 = styled(OutlinedInput)`
  width: 100%;
  input {
    border-radius: 4px;
    font-size: 1rem;
    background: ${props => (props.disabled ? col.slateGrey : col.light)};
    padding: 18px;
    box-sizing: border-box;
    height: fit-content;
  }
`;

export const Input = ({ label, password, value, setValue, disabled }) => {
  return (
    <Box mb={'1.8rem'} width={'100%'}>
      {label && <FormHelperText1>{label}</FormHelperText1>}
      <OutlinedInput1
        value={value}
        onChange={setValue}
        type={password ? 'password' : 'text'}
        disabled={disabled ? disabled : false}
      />
    </Box>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  password: PropTypes.bool,
  value: PropTypes.string || PropTypes.number,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};

//svg size is computed against font-size, with a defaut font-size of 1.5rem
export const CheckboxCM1 = styled(Checkbox)`
  color: ${col.light};
  padding: 0;

  .MuiSvgIcon-root {
    color: ${col.light};
    font-size: 1.2rem;
  }
`;
