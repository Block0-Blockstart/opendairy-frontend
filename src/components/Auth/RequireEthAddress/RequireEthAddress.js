import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useUser } from '../../../hooks/useUser';
import { Loading } from '../../../shared/Loading';

export const RequireEthAddress = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <Loading />;

  if (user.ethAddress) return <>{children}</>;

  return <Navigate to="/documents" />;
};

RequireEthAddress.propTypes = {
  children: PropTypes.node.isRequired,
};
