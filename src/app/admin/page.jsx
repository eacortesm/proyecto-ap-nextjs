"use client";

import Navbar from "@/components/Navbar";
import { useUsuario } from "../context/UsuarioContext"; 
import { useEffect, useState } from "react";
import Usuarios from "@/components/Usuarios";

export default function AdminPage() {
  const { usuario } = useUsuario();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await res.json();
        console.log(data)
        setUsuarios(data);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    }

    fetchUsuarios();
  }, []);

  return (
    <div>
      <Navbar tipoUsuario={usuario.tipoUsuario} />
      <main>
        <h2 className="text-2xl mb-4 text-center">Panel de administradores</h2>
        <ul className="w-full max-w-6xl mx-auto grid grid-cols-1 gap-6">
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