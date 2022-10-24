import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as userService from '../services/userService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState({ id: '', email: '', ethAddress: '' });

  const updateUserState = updatedUser => setUser(current => ({ ...current, ...updatedUser }));

  const init = () => {
    setLoading(true);
    setError('');
  };

  const fail = err => {
    setError(err);
    setUser({ id: '', email: '', ethAddress: '' });
    setLoading(false);
  };

  const success = upd => {
    const { id, ethAddress } = upd;
    setError('');
    updateUserState({ id, email: id, ethAddress });
    setLoading(false);
  };

  /**
   * Returns Promise<{data, error}>
   * The signup process has no impact on current user, as signup does not log the user in.
   * So, the user, loading and error states inside this hook are not impacted.
   * As a consequence, loading and errors should be managed by the signup component.
   */
  const signup = async ({ email, password }) => await userService.signup({ email, password });

  const login = async ({ email, password }) => {
    if (user.id) return; // already logged in, so ignore
    init();
    const loginRes = await userService.login({ email, password });
    if (loginRes.error) fail(loginRes.error.message);
    else success(loginRes.data);
  };

  //TODO: do we need to set loading while fetching refresh token ?
  const refreshUser = async () => {
    init();
    const res = await userService.getUser();
    if (res.error) fail(res.error.message);
    else success(res.data);
  };

  const logout = async () => {
    const res = await userService.logout();
    if (!res.error) setUser({ id: '', email: '', ethAddress: '' });
  };

  // in case of page refresh
  useEffect(() => {
    if (!user.id) {
      const wrapper = refreshUser;
      wrapper();
    }
  }, []); // once only !

  const userValues = { user, loading, error, login, refreshUser, signup, logout };

  return <UserContext.Provider value={userValues}> {children} </UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within a UserProvider');
  else return context;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
