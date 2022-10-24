import config from '../config';

import { request, requestWithJwt } from './axiosWrapper';
import { signTx } from './ethersWrapper';

/**
 * @typedef {{ error: null; data: any; } | { error: { message: string; code: number; }; data: null; }} DataOrError
 */

/**
 * WARNING: txfArgs should never include 'tx' arg, because it is computed by this helper function.
 * @param {{
 *  privateKey: string;
 *  txc: ()=>Promise<DataOrError>;
 *  txcArgs: Object<string, any> | null;
 *  txf: ()=>Promise<DataOrError>;
 *  txfArgs: Object<string, any> | null;
 *  }} args
 */
const _createAndForward = async ({ privateKey, txc, txcArgs, txf, txfArgs }) => {
  const unsignedRes = await txc(txcArgs);
  if (unsignedRes.error) return unsignedRes;

  const signedRes = await signTx({ privateKey, rawUnsignedTx: unsignedRes.data });
  if (signedRes.error) return signedRes;

  return await txf({ tx: signedRes.data, ...txfArgs });
};

/**
 *
 * Download a document (from S3).
 */
export const downloadDocument = async ddId =>
  await requestWithJwt(
    { url: `${config.API_DOCUMENT}/document/download/${ddId}`, method: 'GET', responseType: 'blob' },
    true
  );

/**
 *
 * Returns an array of all users.
 * This is used for this prototype instead of providing users being part of a deal.
 * Warning: we should filter results to keep only users having eth address.
 *
 */
export const findAllUsers = async () => await requestWithJwt({ url: `${config.API_DOCUMENT}/users`, method: 'GET' });

/**
 *
 * Returns document types enum used for backend to help frontend consistency.
 *
 */
export const getSchemaDocumentType = async () =>
  await request({ url: `${config.API_DOCUMENT}/document/schema/document-type`, method: 'GET' });

/**
 *
 * Returns document status enum used for backend to help frontend consistency.
 *
 */
export const getSchemaDocumentStatus = async () =>
  await request({ url: `${config.API_DOCUMENT}/document/schema/document-status`, method: 'GET' });

/**
 *
 * Returns a single DR from DB.
 *
 */
export const findOneDr = async ({ id }) =>
  await requestWithJwt({ url: `${config.API_DOCUMENT}/document/document-request/${id}`, method: 'GET' });

/**
 *
 * Returns a single DD from DB.
 *
 */
export const findOneDd = async ({ id }) =>
  await requestWithJwt({ url: `${config.API_DOCUMENT}/document/document-delivery/${id}`, method: 'GET' });

/**
 *
 * Returns user DRs from DB.
 *
 */
export const findAllDr = async () =>
  await requestWithJwt({ url: `${config.API_DOCUMENT}/document/document-request`, method: 'GET' });

/**
 *
 * Returns user DDs from DB.
 *
 */
export const findAllDd = async () =>
  await requestWithJwt({ url: `${config.API_DOCUMENT}/document/document-delivery`, method: 'GET' });

/**
 *
 * Returns history of DDs for a DR, from SC
 *
 */
export const findHistoryDr = async id =>
  await requestWithJwt({ url: `${config.API_DOCUMENT}/document/document-request/history/${id}`, method: 'GET' });

const _txcCreateDocumentRequest = async () =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/document/document-request/tx-create/create-document-request`,
    method: 'POST',
  });

const _txfCreateDocumentRequest = async ({ tx, deadline, documentType, requestedToId }) =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/document/document-request/tx-forward/create-document-request`,
    method: 'POST',
    data: { tx, deadline, documentType, requestedToId },
  });

/**
 *
 * Creates, sign and send transaction to create a DR.
 *
 */
export const createDocumentRequest = async ({ privateKey, deadline, documentType, requestedToId }) => {
  return await _createAndForward({
    privateKey,
    txc: _txcCreateDocumentRequest,
    txcArgs: null,
    txf: _txfCreateDocumentRequest,
    txfArgs: { deadline, documentType, requestedToId },
  });
};

const _txcCreateDocumentDelivery = async ({ documentRequestId, verificationHash }) =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/document/document-request/tx-create/create-document-delivery`,
    method: 'POST',
    data: { documentRequestId, verificationHash },
  });

const _txfCreateDocumentDelivery = async ({ tx, file }) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tx', tx);

  return await requestWithJwt({
    url: `${config.API_DOCUMENT}/document/document-request/tx-forward/create-document-delivery`,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    data: formData,
  });
};

/**
 *
 * Creates, sign and send transaction to send a DD to a DR.
 *
 */
export const createDocumentDelivery = async ({ privateKey, documentRequestId, verificationHash, file }) => {
  const unsignedRes = await _txcCreateDocumentDelivery({ documentRequestId, verificationHash });
  if (unsignedRes.error) return unsignedRes;

  const signedRes = await signTx({ privateKey, rawUnsignedTx: unsignedRes.data });
  if (signedRes.error) return signedRes;

  return await _txfCreateDocumentDelivery({ tx: signedRes.data, file });
};

const _txcAcceptDocumentDelivery = async ({ documentDeliveryId }) =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/document/document-request/tx-create/accept-document-delivery`,
    method: 'POST',
    data: { documentDeliveryId },
  });

const _txfAcceptDocumentDelivery = async ({ tx }) =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/document/document-request/tx-forward/accept-document-delivery`,
    method: 'POST',
    data: { tx },
  });

/**
 *
 * Creates, sign and send transaction to accept a DD.
 *
 */
export const acceptDocumentDelivery = async ({ privateKey, documentDeliveryId }) => {
  return await _createAndForward({
    privateKey,
    txc: _txcAcceptDocumentDelivery,
    txcArgs: { documentDeliveryId },
    txf: _txfAcceptDocumentDelivery,
    txfArgs: null,
  });
};

const _txcRejectDocumentDelivery = async ({ documentDeliveryId }) =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/document/document-request/tx-create/reject-document-delivery`,
    method: 'POST',
    data: { documentDeliveryId },
  });

const _txfRejectDocumentDelivery = async ({ tx }) =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/document/document-request/tx-forward/reject-document-delivery`,
    method: 'POST',
    data: { tx },
  });

/**
 *
 * Creates, sign and send transaction to reject a DD.
 *
 */
export const rejectDocumentDelivery = async ({ privateKey, documentDeliveryId }) => {
  return await _createAndForward({
    privateKey,
    txc: _txcRejectDocumentDelivery,
    txcArgs: { documentDeliveryId },
    txf: _txfRejectDocumentDelivery,
    txfArgs: null,
  });
};

const _txcAskUpdateDocumentDelivery = async ({ documentDeliveryId }) =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/document/document-request/tx-create/ask-update-document-delivery`,
    method: 'POST',
    data: { documentDeliveryId },
  });

const _txfAskUpdateDocumentDelivery = async ({ tx, rejectionReason }) =>
  await requestWithJwt({
    url: `${config.API_DOCUMENT}/document/document-request/tx-forward/ask-update-document-delivery`,
    method: 'POST',
    data: { tx, rejectionReason },
  });

/**
 *
 * Creates, sign and send transaction to reject a DD.
 *
 */
export const askUpdateDocumentDelivery = async ({ privateKey, documentDeliveryId, rejectionReason }) => {
  return await _createAndForward({
    privateKey,
    txc: _txcAskUpdateDocumentDelivery,
    txcArgs: { documentDeliveryId },
    txf: _txfAskUpdateDocumentDelivery,
    txfArgs: { rejectionReason },
  });
};

/**
 *
 * Computes the hash from backend.
 *
 */
export const getHash = async ({ formData }) =>
  await request({
    url: `${config.API_DOCUMENT}/document/hash`,
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
