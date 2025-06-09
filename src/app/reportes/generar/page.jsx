'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUsuario } from "@/app/context/UsuarioContext";
import Navbar from "@/components/Navbar";

export default function CrearReportePage() {
  const { usuario } = useUsuario();
  const router = useRouter();
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch departments - similar to how you fetch professors
  useEffect(() => {
    async function fetchDepartamentos() {
      try {
        setLoading(true);
        const res = await fetch('/api/departamentos');
        if (!res.ok) throw new Error('Error al obtener los departamentos');
        const data = await res.json();
        setDepartamentos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDepartamentos();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = {
        titulo: e.target.titulo.value,
        tipoReporte: e.target.tipoReporte.value,
        departamento: e.target.departamento.value,
        descripcion: e.target.descripcion.value,
        contenido: e.target.contenido.value,
        fechaInicio: e.target.fechaInicio.value,
        fechaFin: e.target.fechaFin.value,
        estado: e.target.estado.value,
        creador: usuario.email,
      };

      const res = await fetch('/api/reportes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/reportes');
        }, 2000);
      } else {
        throw new Error(data.error || 'Error al crear el reporte');
      }
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      alert(`Error al crear el reporte: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar tipoUsuario={usuario?.tipoUsuario} />
        <div className="max-w-2xl mx-auto p-8 text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">¡Reporte Creado Exitosamente!</h1>
          <p className="text-gray-600 mb-8">El reporte ha sido guardado en el sistema correctamente.</p>
          <button
            onClick={() => router.push('/reportes')}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ver Todos los Reportes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar tipoUsuario={usuario?.tipoUsuario} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Generar Nuevo Reporte</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete el formulario para crear un nuevo reporte en el sistema
          </p>
        </div>
        
        <form 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          onSubmit={onSubmit}
        >
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                  Título del Reporte
                </label>
                <input 
                  type="text" 
                  id="titulo" 
                  name="titulo" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: Reporte de actividades trimestral"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="tipoReporte" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Reporte
                </label>
                <select
                  id="tipoReporte"
                  name="tipoReporte"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Seleccione un tipo</option>
                  <option value="ACADEMICO">Académico</option>
                  <option value="ADMINISTRATIVO">Administrativo</option>
                  <option value="FINANCIERO">Financiero</option>
                  <option value="OPERATIVO">Operativo</option>
                  <option value="SEGURIDAD">Seguridad</option>
                  <option value="OTRO">Otro</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio
                </label>
                <input 
                  type="date" 
                  id="fechaInicio" 
                  name="fechaInicio" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Fin
                </label>
                <input 
                  type="date" 
                  id="fechaFin" 
                  name="fechaFin" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-2">
                Departamento Responsable
              </label>
              {loading ? (
                <div className="animate-pulse h-12 bg-gray-200 rounded-lg"></div>
              ) : (
                <select
                  id="departamento"
                  name="departamento"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Seleccione un departamento</option>
                  {departamentos.map((dept) => (
                    <option key={dept.id} value={dept.codigo}>
                      {dept.nombre}
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Resumida
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="2"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Proporcione una breve descripción del reporte"
                required
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-2">
                Contenido Detallado
              </label>
              <textarea
                id="contenido"
                name="contenido"
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Incluya todos los detalles relevantes del reporte..."
                required
              ></textarea>
            </div>
            
            <div className="mb-8">
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                Estado del Reporte
              </label>
              <select
                id="estado"
                name="estado"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="BORRADOR">Borrador</option>
                <option value="PENDIENTE">Pendiente de Revisión</option>
                <option value="REVISADO">Revisado</option>
                <option value="APROBADO">Aprobado</option>
                <option value="ARCHIVADO">Archivado</option>
              </select>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando Reporte...
                  </>
                ) : "Generar Reporte"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}