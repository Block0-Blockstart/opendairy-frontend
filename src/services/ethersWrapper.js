import { BigNumber, Wallet } from 'ethers';

/**
 * @typedef {{ error: null; data: any; } | { error: { message: string; code: number; }; data: null; }} DataOrError
 */

export const parseUnsignedTx = rawUnsignedTx => {
  let { gasLimit, gasPrice } = rawUnsignedTx;

  const toBigNumber = value => {
    // case1 : value is already in expected ethers format
    if (value.type && value.type === 'BigNumber') {
      return BigNumber.from(value.hex);
    } else {
      //case2: value can be converted to BigNumber (string, hexstring, number, ...)
      return BigNumber.from(value);
    } //any other case will throw
  };

  gasLimit = toBigNumber(gasLimit);
  gasPrice = toBigNumber(gasPrice);

  return { ...rawUnsignedTx, gasLimit, gasPrice };
};

/**
 *
 * @returns {Promise<DataOrError>}
 *
 */
export const signTx = async ({ privateKey, rawUnsignedTx }) => {
  let unsignedTx;

  try {
    unsignedTx = parseUnsignedTx(rawUnsignedTx);
  } catch (e) {
    console.error('Error from "SignTx". See below :');
    console.error(e);
    return { data: null, error: { code: 0, message: 'Cannot parse unsigned transaction.' } };
  }

  let wallet;
  try {
    wallet = new Wallet(privateKey);
  } catch (e) {
    console.error('Error from "SignTx". See below :');
    console.error(e);
    return { data: null, error: { code: 0, message: 'Invalid signature.' } };
  }

  let signed;
  try {
    signed = await wallet.signTransaction(unsignedTx);
  } catch (e) {
    if (e?.reason?.includes('transaction from address mismatch')) {
      return { data: null, error: { code: 0, message: 'Signature does not match the account.' } };
    }
    return { data: null, error: { code: 0, message: 'Error while signing.' } };
  }
  return { data: signed, error: null };
};
