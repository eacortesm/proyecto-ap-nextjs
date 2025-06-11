'use client';

import Navbar from "@/components/Navbar";
import { useUsuario } from "@/app/context/UsuarioContext";
import { useEffect, useState } from "react";

export default function GenerarBackupPage() {
  const { usuario, loading } = useUsuario();
  const [users, setUsers] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [logs, setLogs] = useState([]);
  const [becas, setBecas] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/usuarios');
        if (!res.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await res.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    async function fetchOfertas() {
      try {
        const res = await fetch('/api/oferta'); 
        if (!res.ok) throw new Error('Error al obtener las ofertas');
        const data = await res.json();
        setOfertas(data);
      } catch (err) {
        console.error('Error fetching ofertas:', err);
      }
    }

    fetchUsers();
    fetchOfertas();
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
        <p className="text-gray-600">Por favor, inicia sesión para acceder a esta funcionalidad.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar tipoUsuario={usuario.tipoUsuario} />
      <main className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl mb-4 text-center">Generar Backup</h2>
        <p className="text-gray-600 text-center">Esta funcionalidad aún no está implementada.</p>
        <p className="text-gray-600 text-center">Pronto estará disponible.</p>
      </main>
    </div>
  )
}