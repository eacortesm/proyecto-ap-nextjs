'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUsuario } from "@/app/context/UsuarioContext";
import Navbar from "@/components/Navbar";

export default function BuscarOfertaPage() {
  const { usuario } = useUsuario();
  const router = useRouter();
  const [ofertas, setOfertas] = useState([]);

  const onSubmit = async (e) => {
  e.preventDefault();
  const titulo = e.target.titulo.value;
  const departamento = e.target.departamento.value;
  const requisitos = e.target.requisitos.value;

  // Aquí rediriges sin consultar al backend en esta página
  const query = new URLSearchParams({ titulo, departamento, requisitos }).toString();
  router.push(`/oferta?${query}`);
};


  return (
    <div>
      <Navbar tipoUsuario={usuario?.tipoUsuario} />
      <h1 className="text-2xl font-bold text-center my-8">Buscar Oferta</h1>
      <form className="max-w-2xl mx-auto p-6 bg-gray-200 shadow-md rounded-lg" onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título de la Oferta</label>
          <input type="text" id="titulo" name="titulo" className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div className="mb-4">
          <select
            id="departamento"
            name="departamento"
            className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
            defaultValue=""
          >
            <option value="" disabled>Elige un departamento</option>
            <option value="DAM">Departamento de Administración de Mantenimiento</option>
            <option value="DATIC">Departamento de Administración de Tecnologías de Información y Comunicaciones</option>
            <option value="DAR">Departamento de Administración y Registro</option>
            <option value="DA">Departamento de Aprovisionamiento</option>
            <option value="DBGS">Departamento de Becas y Gestión Social</option>
            <option value="DGTH">Departamento de Gestión del Talento Humano</option>
            <option value="DOP">Departamento de Orientación y Psicología</option>
            <option value="DSG">Departamento de Servicios Generales</option>
            <option value="DEVESA">Departamento de Vida Estudiantil y Servicios Académicos</option>
            <option value="DVESA">Departamento de Vida Estudiantil y Servicios Académicos, Campus Tecnológico Local de San Carlos</option>
            <option value="DFC">Departamento Financiero Contable</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="requisitos" className="block text-sm font-medium text-gray-700">Requisitos</label>
          <input type="text" id="requisitos" name="requisitos" className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Buscar Oferta</button>
      </form>
    </div>
  )
}