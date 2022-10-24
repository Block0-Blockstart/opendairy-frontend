import React from 'react';
import PropTypes from 'prop-types';

import { Box, Checkbox, FormHelperText, OutlinedInput, Paper, styled } from '@mui/material';

import { col, mw } from '../../../mui-settings';

export const PaperCM1 = styled(Paper)`
  border-radius: 4px;
  max-width: 1680px;
  margin: 30px auto;
  padding: 25px 30px 60px 30px;
`;

//svg size is computed against font-size, with a defaut font-size of 1.5rem
export const CheckboxCM1 = styled(Checkbox)`
  color: ${col.primary};
  padding: 0;

  .MuiSvgIcon-root {
    font-size: 1.2rem;
  }
`;

const FormHelperText1 = styled(FormHelperText)`
  font-size: 0.75rem;
  line-height: 1rem;
  color: #707070;
  text-transform: uppercase;
  margin: 0 0 8px 0;
`;

const OutlinedInput1 = styled(OutlinedInput)`
  width: 100%;
  input {
    padding: 5px 20px;
    height: 40px;
    box-sizing: border-box;
    font-size: 1rem;
  }
`;

const Box1 = styled(Box)`
  margin-bottom: 22px;
  width: 100%;

  @media screen and (min-width: ${mw.sm}px) {
    width: 40%;
    min-width: 295px;
  }
`;

export const Input = ({ label, password, value, setValue }) => {
  return (
    <Box1>
      {label && <FormHelperText1>{label}</FormHelperText1>}
      <OutlinedInput1 value={value} onChange={setValue} type={password ? 'password' : 'text'} />
    </Box1>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  password: PropTypes.bool,
  value: PropTypes.string || PropTypes.number,
  setValue: PropTypes.func,
};
