'use client';

import { useUsuario } from "@/app/context/UsuarioContext";
import Navbar from "@/components/Navbar";

export default function CrearOfertaPage() {
  const { usuario } = useUsuario();

  return (
    <div>
      <Navbar tipoUsuario={usuario?.tipoUsuario} />
      <h1 className="text-2xl font-bold text-center my-8">Crear Nueva Oferta</h1>
      <form className="max-w-2xl mx-auto p-6 bg-gray-200 shadow-md rounded-lg">
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título de la Oferta</label>
          <input type="text" id="titulo" name="titulo" required className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea id="descripcion" name="descripcion" required className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Crear Oferta</button>
      </form>
    </div>
  );
}