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
        } else {
          setUsuario(null);
        }
      } catch (error) {
        console.error('Error fetching usuario:', error);
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUsuario();
  }, []);


if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
        <p className="text-xl">Cargando...</p>
      </div>
    );
  }

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, loading }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UsuarioContext);
}
