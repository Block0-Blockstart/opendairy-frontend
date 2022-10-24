import React from 'react';
import PropTypes from 'prop-types';

import { useScrollTrigger } from '@mui/material';

export const ElevationScroll = ({ children, target = window }) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0, target });
  return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
};

ElevationScroll.propTypes = { children: PropTypes.element.isRequired, target: PropTypes.any };
