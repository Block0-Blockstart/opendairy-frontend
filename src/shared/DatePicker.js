import PropTypes from 'prop-types';

import { TextField } from '@mui/material';

export const DatePicker = ({ value, setValue, disabled }) => {
  const handleChange = e => setValue(e.target.value);
  return (
    <TextField
      disabled={disabled}
      onChange={handleChange}
      size="small"
      id="date"
      type="date"
      value={value}
      sx={{ backgroundColor: 'white', width: 220 }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

DatePicker.propTypes = { value: PropTypes.string, setValue: PropTypes.func, disabled: PropTypes.bool };
