/**
 * DRSchema = schema for any document request (DR).
 */
export const schemaDR = {
  id: 'string | number',
  requestDate: 'string',
  requestedBy: 'string',
  requestedTo: 'string',
  deadline: 'string | null',
  documentType: 'DocumentType',
  status: 'DRStatus',
  lastRejectedReason: 'string | null',
  contractDR: 'string | null', // could this be null while not yet deployed?
};

/**
 * DDSchema = schema for any document delivery (DS).
 */
export const schemaDD = {
  id: 'string | number',
  idDR: 'string | number',
  sentDate: 'string',
  sender: 'string',
  receiver: 'string',
  verificationHash: 'string | null',
  txHash: 'string', // could this be null while not yet record on-chain?
};

/**
 * This schema should be replaced by the user schema used by OD,
 * improved with our stuff
 */
export const schemaUser = {
  id: 'string | number',
  name: 'string',
  ethAccount: {
    address: 'string',
    pubKey: 'string',
  },
};

export const schemaDeal = {
  id: 'string | number',
  placed: 'string',
  offerType: 'string',
  productSpec: 'string',
  volume: 'string',
  departure: 'string',
  price: 'string',
};
