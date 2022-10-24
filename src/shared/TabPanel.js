import PropTypes from 'prop-types';

export const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} id={`tabpan-${index}`} aria-labelledby={`tab-${index}`} {...other}>
    {value === index && <>{children}</>}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
