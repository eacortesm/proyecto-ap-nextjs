'use client';

import { createContext, useContext, useState } from 'react';

const UsuarioContext = createContext();

export function UsuarioProvider({ children, initialUsuario }) {
  const [usuario, setUsuario] = useState(initialUsuario);
  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UsuarioContext);
}
