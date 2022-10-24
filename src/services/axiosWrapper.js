import axios from 'axios';

import conf from '../config';

import jwtStore from './jwtStore';

/**
 * @typedef {{ error: null; data: any; responseHeaders: any | undefined } | { error: { message: string; code: number; }; data: null; }} DataOrError
 */

/* ************************************************************************** *
 * To migrate this axiosWrapper to a lib, we should pass the refresh
 * function (or config) as an argument to the requestWithJwt function.
 * Or better, allow an initilaizer at app root (like react-query, apollo, and
 * many other libs).
 * For simplicity here, we declare the function below.
 * ************************************************************************* */
const refreshTokenConfig = { url: `${conf.API_AUTH}/refresh-session`, method: 'GET', withCredentials: true };

/**
 *
 * Simple Axios request with error management.
 * The request never fails but returns {data, error}.
 * Either data or error is always null.
 * Error is in the shape {message, code}.
 * Data may vary.
 * The config arg is a classic axios config.
 * Prevents passing credentials except if explicitly set in config.
 *
 * Note: if withResponseHeaders is true, the response headers are also returned WHEN there is no error.
 *
 * @return {Promise<DataOrError>}
 */
export const request = async (config, withResponseHeaders = false) => {
  try {
    const { data, headers } = await axios({ withCredentials: false, ...config });
    if (withResponseHeaders) return { error: null, data, responseHeaders: headers };
    return { error: null, data };
  } catch (e) {
    if (e.response) {
      if (e.response.status < 500) {
        return {
          error: { message: e.response.data.message || 'Unknown error', code: e.response.status },
          data: null,
        };
      } else {
        return { error: { message: 'API internal error', code: e.response.status }, data: null };
      }
    } else if (e.request) {
      // the request was made but no response was received. `e.request` is an instance of XMLHttpRequest
      console.error(e);
      return {
        error: { message: `Request to ${config.url} has failed without response.`, code: 0 },
        data: null,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(e);
      return {
        error: { message: `Request to ${config.url} has failed because of internal React error.`, code: 0 },
        data: null,
      };
    }
  }
};

/**
 *
 * @returns { Promise<DataOrError>}
 *
 */
const _refreshToken = async () => {
  const res = await request(refreshTokenConfig);
  if (res.error) return res;

  const { jwt } = res.data;
  jwtStore.setJwt(jwt);

  return { data: 'ok', error: null };
};

/**
 *
 * @returns { Promise<DataOrError>}
 *
 */
const _requestWithJwt = async (config, retrying = false, withResponseHeaders = false) => {
  // 1st try and there is no jwt in store ==> try again with a fresh new jwt
  if (!jwtStore.getJwt() && !retrying) {
    const refreshRes = await _refreshToken();
    if (refreshRes.error) return refreshRes;
    return await _requestWithJwt(config, true, withResponseHeaders);
  }

  // 1st or second try, using the stored jwt
  const confJwt = { ...config, headers: { Authorization: `Bearer ${jwtStore.getJwt()}` } };

  const res = await request(confJwt, withResponseHeaders);

  // 1st try failed 401 or 403 with token expired ==> refresh and call retry
  if (res.error && res.error.message === 'Access Token has expired' && !retrying) {
    const refreshRes = await _refreshToken();
    if (refreshRes.error) return refreshRes;
    return await _requestWithJwt(config, true, withResponseHeaders);
  } else return res;
};

/**
 *
 * Simple Axios request with error management and bearer token joined to the request.
 * The jwt is imported from jwtStore if possible (your login request may initialize it).
 * If jwt is not avaiable, the refresh token is used.
 * If the request fails because of 401, the refresh token is also used to get a new jwt
 * and the request is retried (once).
 * The request never fails but returns {data, error}.
 * Either data or error is always null.
 * Error is in the shape {message, code}.
 * Data may vary.
 * The config arg is a classic axios config.
 * Prevents passing credentials except if explicitly set in config.
 *
 * Note: if withResponseHeaders is true, the response headers are also returned WHEN there is no error.
 */
export const requestWithJwt = async (config, withResponseHeaders) =>
  await _requestWithJwt(config, false, withResponseHeaders);
