/**
 * Document types are restricted to a limited list.
 * This list is maintained by OD system and we should use it instead of this demo list
 */
export const DocumentType = {
  INVOICE: 'Invoice',
  BILL_OF_LADING: 'B/L',
  COO: 'COO',
  HEALTH_VET: 'Health/Veterinary',
  JAKIM_HALAL: 'Jakim Halal Certified',
  EUR1: 'EUR1',
  COA: 'COA',
  HALAL: 'Halal',
  IMPORT_PERMIT: 'Import Permit',
  MSDS: 'MSDS',
};

/**
 * DRStatus = document request (DR) status.
 * NEW,       labelled as 'Not shared',     means: it's a new DR, still pending
 * UPDATE,    labelled as 'Waiting update', means: the DR has been fulfilled but was rejected by the requester, usually with an explicit reason. The requester is waiting an update.
 * ACCEPTED,  labelled as 'Accepted',       means: the requester has definitely accepted the shared document
 * REJECTED,  labelled as 'Rejected',       means: the requester has definitely rejected the shared document
 */
export const DRStatus = {
  NEW: 'Not shared',
  UPDATE: 'Waiting update',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
};
