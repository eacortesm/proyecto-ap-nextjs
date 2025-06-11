"use client";

import Navbar from "@/components/Navbar";
import { useUsuario } from "../context/UsuarioContext"; 
import { useEffect, useState } from "react";
import Usuarios from "@/components/Usuarios";

export default function AdminPage() {
  const { usuario, loading } = useUsuario();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await fetch('/api/usuarios');
        if (!res.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await res.json();
        setUsuarios(data.data);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    }

    fetchUsuarios();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div>
        <Navbar />
        <p className="text-gray-600">Por favor, inicia sesión para acceder al panel de administradores.</p>
      </div>
    )
  }

  return (
    <div>
      <Navbar tipoUsuario={usuario.tipoUsuario} />
      <main>
        <h2 className="text-2xl mb-4 text-center">Panel de administradores</h2>
        <ul className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          { usuarios.length > 0 ? (
            usuarios.map((user) => (
              
              <li key={user.email} className="mb-2">
                <Usuarios usuario={user} />
              </li>
            ))
          ) : (
            <p>No hay usuarios disponibles.</p>
          )}
        </ul>
      </main>
    </div>
  )
}