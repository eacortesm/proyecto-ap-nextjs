'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const res = await fetch('/api/persistence', {
          method: 'GET',
          credentials: 'include'
        });

        if (res.ok) {
          const data = await res.json();
          setUsuario(data.usuario);
        }
      } catch (error) {
        console.error('Error fetching usuario:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsuario();
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, loading }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UsuarioContext);
}
