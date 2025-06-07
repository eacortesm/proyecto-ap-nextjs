'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useUsuario } from "../context/UsuarioContext";

export default function PerfilPage() {
  const { usuario } = useUsuario();
  const email = usuario?.email || "";

  const [name, setName] = useState(usuario?.name || "");
  const [apellidos, setApellidos] = useState(usuario?.apellidos || "");
  const [contacto, setContacto] = useState(usuario?.contacto || "");
  const [editando, setEditando] = useState(false);

  const handleGuardar = async () => {
    try {
      
      setEditando(false);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  if (!usuario) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-xl text-gray-700">No has iniciado sesión.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar tipoUsuario={usuario.tipoUsuario} />

      <main className="flex items-center justify-center py-10">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Mi Perfil</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <p className="text-gray-800 font-medium">{usuario.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
              {editando ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium">{usuario.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Apellidos</label>
              {editando ? (
                <input
                  type="text"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium">{apellidos || "No disponible"}</p>
              )}
            </div>

            { usuario.tipoUsuario === "ESTUDIANTE" && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Contacto</label>
                {editando ? (
                  <input
                    type="tel"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{contacto || "No disponible"}</p>
                )}
              </div>
            )}

            <div className="pt-4">
              {editando ? (
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={handleGuardar}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditando(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="text-right">
                  <button
                    onClick={() => setEditando(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Editar Perfil
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
