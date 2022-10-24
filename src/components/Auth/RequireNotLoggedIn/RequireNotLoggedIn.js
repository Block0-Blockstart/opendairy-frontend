import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useUser } from '../../../hooks/useUser';
import { Loading } from '../../../shared/Loading';

export const RequireNotLoggedIn = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <Loading />;

  if (user.id) return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

RequireNotLoggedIn.propTypes = {
  children: PropTypes.node.isRequired,
};
