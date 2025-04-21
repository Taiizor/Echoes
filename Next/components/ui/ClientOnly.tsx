import React, { useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

/**
 * Client-side only component to avoid hydration errors with server-side rendering
 */
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

export default ClientOnly; 