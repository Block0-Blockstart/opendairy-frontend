import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useUser } from '../../../hooks/useUser';
import { Loading } from '../../../shared/Loading';

export const RequireLoggedIn = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <Loading />;

  if (user.id) return <>{children}</>;

  return <Navigate to="/" />;
};

RequireLoggedIn.propTypes = {
  children: PropTypes.node.isRequired,
};
