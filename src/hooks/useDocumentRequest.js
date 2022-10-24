import { useEffect, useState } from 'react';

import { findAllDr } from '../services/documentService';

import { useUser } from './useUser';

// retrieves the last DD by sentDate
const lastDd = dds => dds.sort((dd1, dd2) => dd1.sentDate - dd2.sentDate).pop();

const parseDrs = drs =>
  drs.map(dr => {
    const { documentDeliveries, ...other } = dr;
    const documentDelivery = lastDd(documentDeliveries);
    if (documentDelivery) return { ...other, documentDelivery };
    return other;
  });

export const useDocumentRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [myDrs, setMyDrs] = useState([]);
  const [theirDrs, setTheirDrs] = useState([]);

  const { user } = useUser();

  const fetchPendingDrs = async () => {
    setError('');
    const clearToken = setTimeout(() => setLoading(true), 1000); //set loading only if request takes more than 1sec
    const res = await findAllDr();
    if (res.error) {
      setError(`findAllDr: unexpected failure. Code:${res.error.code}, message:${res.error.message}`);
      clearTimeout(clearToken);
      setLoading(false);
      return;
    }
    const drs = parseDrs(res.data);
    setMyDrs(drs.filter(dr => dr.requestedBy.id === user.id));
    setTheirDrs(drs.filter(dr => dr.requestedTo.id === user.id));
    clearTimeout(clearToken);
    setLoading(false);
  };

  useEffect(() => {
    const fetchPendingDrsWrapper = fetchPendingDrs;
    fetchPendingDrsWrapper();
  }, [user.id]);

  return { loading, error, myDrs, theirDrs, refresh: fetchPendingDrs };
};
