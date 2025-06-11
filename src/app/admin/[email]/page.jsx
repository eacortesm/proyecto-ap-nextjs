'use client';

import Navbar from "@/components/Navbar";
import { useUsuario } from "@/app/context/UsuarioContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { usuario, loading } = useUsuario();
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [editando, setEditando] = useState(false);

  // Campos editables
  const [name, setName] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/usuarios/${email}`);
        if (!res.ok) throw new Error("Error al obtener el usuario");

        const data = await res.json();
        if (data.success) {
          setUser(data.data);
          setName(data.data.name || "");
          setApellidos(data.data.apellidos || "");
          setTipoUsuario(data.data.tipoUsuario || "");
        } else {
          console.error("Error fetching user:", data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, [email]);

  const handleGuardar = async () => {
    try {
      const res = await fetch(`/api/usuarios/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, apellidos, tipoUsuario }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const updatedUser = data.data.data;
        setUser(updatedUser);
        setName(updatedUser.name || "");
        setApellidos(updatedUser.apellidos || "");
        setTipoUsuario(updatedUser.tipoUsuario || "");
        setEditando(false);
      } else {
        console.error("Error al guardar los cambios:", data.error || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };


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
    );
  }

  return (
    <div>
      <Navbar tipoUsuario={usuario.tipoUsuario} />
      <main className="min-h-screen bg-gray-100 py-10">
        <h2 className="text-2xl mb-6 text-center">Panel de administradores</h2>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-5">
          {user ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
                {editando ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-800">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Apellidos</label>
                {editando ? (
                  <input
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-800">{user.apellidos || "No disponible"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Tipo de Usuario</label>
                {editando ? (
                  <select
                    value={tipoUsuario}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  >
                    <option value="ESTUDIANTE">Estudiante</option>
                    <option value="PROFESOR">Profesor</option>
                    <option value="ESCUELA">Escuela</option>
                    <option value="ADMINISTRADOR">Administrador</option>
                  </select>

                ) : (
                  <p className="text-gray-800">{user.tipoUsuario || "No disponible"}</p>
                )}
              </div>

              <div className="pt-4 text-right">
                {editando ? (
                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={handleGuardar}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditando(false)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditando(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    Editar Usuario
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-600">No se encontró el usuario.</p>
          )}
        </div>
      </main>
    </div>
  );
}
