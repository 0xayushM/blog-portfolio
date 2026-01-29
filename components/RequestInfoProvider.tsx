'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import RequestInfoModal from './RequestInfoModal';

type RequestInfoContextValue = {
  open: () => void;
  close: () => void;
};

const RequestInfoContext = createContext<RequestInfoContextValue | null>(null);

export function useRequestInfo() {
  const ctx = useContext(RequestInfoContext);
  if (!ctx) throw new Error('useRequestInfo must be used within RequestInfoProvider');
  return ctx;
}

export default function RequestInfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const autoOpenedRef = useRef(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (autoOpenedRef.current) return;
    autoOpenedRef.current = true;

    const key = 'request_info_auto_opened_v1';
    const alreadyOpened = typeof window !== 'undefined' && window.sessionStorage.getItem(key) === '1';
    if (alreadyOpened) return;

    const t = window.setTimeout(() => {
      window.sessionStorage.setItem(key, '1');
      setIsOpen(true);
    }, 2000);

    return () => window.clearTimeout(t);
  }, []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <RequestInfoContext.Provider value={value}>
      {children}
      <RequestInfoModal isOpen={isOpen} onClose={close} />
    </RequestInfoContext.Provider>
  );
}
