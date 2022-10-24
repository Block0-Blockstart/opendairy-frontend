import PropTypes from 'prop-types';

import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';

export const ExclusiveRadioSet = ({ items, value, setValue, disabled, height = '250px' }) => {
  const handleChange = e => setValue(e.target.value);

  return (
    <RadioGroup value={value} onChange={handleChange}>
      <Box display="flex" flexDirection={'column'} flexWrap="wrap" height={height}>
        {items.map(d => (
          <FormControlLabel
            key={d.id}
            value={d.value}
            control={<Radio disabled={disabled} size="small" />}
            label={d.label}
          />
        ))}
      </Box>
    </RadioGroup>
  );
};

ExclusiveRadioSet.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  value: PropTypes.string,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
  height: PropTypes.string,
};
