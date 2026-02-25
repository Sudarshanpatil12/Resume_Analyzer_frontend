import { createContext, useEffect, useMemo, useState } from 'react';
import { APP_ALERT_EVENT } from '../utils/alerts';

export const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const onAlert = (event) => {
      const payload = event.detail;
      if (!payload?.message) return;

      setAlerts((prev) => [...prev, payload]);

      window.setTimeout(() => {
        setAlerts((prev) => prev.filter((item) => item.id !== payload.id));
      }, 3500);
    };

    window.addEventListener(APP_ALERT_EVENT, onAlert);
    return () => window.removeEventListener(APP_ALERT_EVENT, onAlert);
  }, []);

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((item) => item.id !== id));
  };

  const value = useMemo(() => ({ alerts, removeAlert }), [alerts]);

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}
