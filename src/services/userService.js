import config from '../config';

import { request, requestWithJwt } from './axiosWrapper';
import { signTx } from './ethersWrapper';
import jwtStore from './jwtStore';

/**
 *
 * Signup user both in cognito and document api
 *
 */
export const signup = async ({ email, password }) =>
  await request({ url: `${config.API_DOCUMENT}/user/signup`, method: 'POST', data: { email, password } });

/**
 *
 * Log user in cognito, then fetch user from db, then returns user including its access token
 *
 */
export const login = async ({ email, password }) => {
  const loginRes = await request({ url: `${config.API_AUTH}/login`, method: 'POST', data: { email, password } });

  if (loginRes.error) return loginRes;

  const { jwt } = loginRes.data;
  jwtStore.setJwt(jwt);

  return await getUser();
};

/**
 *
 * Returns a DB user from access token.
 *
 */
export const getUser = async () => await requestWithJwt({ url: `${config.API_DOCUMENT}/user`, method: 'GET' });

/**
 *
 * Logs the user out (destroy refresh token cookie).
 *
 */
export const logout = async () => await request({ url: `${config.API_AUTH}/logout`, method: 'POST' });

const _txcRegisterEthAccount = async ({ ethAddress, pubKey }) =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/user/tx-create/register-eth`,
    method: 'POST',
    data: { ethAddress, pubKey },
  });

const _txfRegisterEthAccount = async ({ ethAddress, tx }) =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/user/tx-forward/register-eth`,
    method: 'POST',
    data: { ethAddress, tx },
  });

/**
 *
 * Creates, sign and send transaction to register an eth account.
 *
 */
export const registerEthAccount = async ({ ethAddress, pubKey, privateKey }) => {
  const unsignedRes = await _txcRegisterEthAccount({ ethAddress, pubKey });
  if (unsignedRes.error) return unsignedRes;

  const signedRes = await signTx({ privateKey, rawUnsignedTx: unsignedRes.data });
  if (signedRes.error) return signedRes;

  return await _txfRegisterEthAccount({ ethAddress, tx: signedRes.data });
};
