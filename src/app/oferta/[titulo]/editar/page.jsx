'use client';

import Navbar from "@/components/Navbar";
import { useUsuario } from "@/app/context/UsuarioContext";

export default function EditarOfertaPage() {
  const { usuario, loading } = useUsuario();

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const titulo = e.target.titulo.value;
    const descripcion = e.target.descripcion.value;
  }

  return (
    <div>
      <Navbar tipoUsuario={usuario.tipoUsuario} />
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-center py-10">Editar Oferta</h1>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}