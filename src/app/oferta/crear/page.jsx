'use client';

import { useState, useEffect } from "react";
import { useUsuario } from "@/app/context/UsuarioContext";
import Navbar from "@/components/Navbar";

export default function CrearOfertaPage() {
  const { usuario } = useUsuario();
  const [profesores, setProfesores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfesores() {
      try {
        const res = await fetch('/api/users/profesores');
        if (!res.ok) throw new Error('Error al obtener los profesores');
        const data = await res.json();
        console.log(data);
        setProfesores(data.data);
      } catch (err) {
        setProfesores([]);
        setError(err.message);
      }
    }

    fetchProfesores();

  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const titulo = e.target.titulo.value;
      const descripcion = e.target.descripcion.value;

      const res = await fetch('/api/oferta', {
        'method': 'POST',
        'body': JSON.stringify({ titulo, descripcion }),
        'headers': { 'Content-Type': 'application/json' },
      })

      const data = await res.json();
      if (res.ok) {
        console.log('Oferta creada:', data);
        e.target.reset(); 
      } else {
        console.error('Error al crear la oferta:', data.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al crear la oferta:', error);
    }
  }

  return (
    <div>
      <Navbar tipoUsuario={usuario?.tipoUsuario} />
      <h1 className="text-2xl font-bold text-center my-8">Crear Nueva Oferta</h1>
      <form className="max-w-2xl mx-auto p-6 bg-gray-200 shadow-md rounded-lg" onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título de la Oferta</label>
          <input type="text" id="titulo" name="titulo" className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea id="descripcion" name="descripcion" className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" required></textarea>
        </div>
        <div className="mb-4">
          <select
							id="tipoTrabajo"
							name="tipoTrabajo"
							className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
							defaultValue=""
							required
						>
							<option value="" disabled>Elige el tipo de trabajo</option>
							<option value="Asistencia">Asistencia</option>
							<option value="Tutoria">Tutoría</option>
							<option value="Proyecto">Proyecto</option>
						</select>
        </div>
        <div className="mb-4">
          <select
            id="departamento"
            name="departamento"
            className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
            defaultValue=""
            required
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
        { (usuario?.tipoUsuario === 'ESCUELA' || usuario?.tipoUsuario === 'ADMINISTRADOR') && (
          <div className="mb-4">
            <select
            id="profesor"
            name="profesor"
            className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
            defaultValue=""
            required
          >
              <option value="" disabled>Elige un profesor</option>
              { profesores.length > 0 && (
                profesores.map((profesor) => (
                  <option key={profesor._id || profesor.id} value={profesor.email}>
                    {profesor.name} {profesor.apellidos}
                  </option>
                  ))
                )
              }
            </select>
          </div>
        )

        }
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Crear Oferta</button>
      </form>
    </div>
  );
}