import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const DashboardIndex = () => {
  const nav = useNavigate();

  useEffect(() => {
    nav('offers', { state: { tabValue: 0 } });
  }, []);

  return null;
};
