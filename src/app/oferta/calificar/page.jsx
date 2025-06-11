'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUsuario } from "@/app/context/UsuarioContext";
import Navbar from "@/components/Navbar";

export default function CalificarUsuario() {
  const { usuario } = useUsuario();
  const router = useRouter();
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch students who need evaluation
  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        // Replace with your actual API endpoint
        const res = await fetch(`/api/estudiantes?evaluadorId=${usuario.id}`);
        const data = await res.json();
        setEstudiantes(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    if (usuario?.id) fetchEstudiantes();
  }, [usuario]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      estudianteId: e.target.estudiante.value,
      calificacion: parseInt(e.target.calificacion.value),
      comentarios: e.target.comentarios.value,
      evaluadorId: usuario.id
    };

    try {
      // Send rating to backend
      const res = await fetch('/api/calificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Calificación enviada exitosamente!');
        router.push('/dashboard');
      } else {
        throw new Error('Error al enviar calificación');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error al enviar la calificación');
    }
  };

  return (
    <div>
      <Navbar tipoUsuario={usuario?.tipoUsuario} />
      <h1 className="text-2xl font-bold text-center my-8">Calificar Estudiante</h1>
      
      {loading ? (
        <p className="text-center">Cargando estudiantes...</p>
      ) : (
        <form 
          className="max-w-2xl mx-auto p-6 bg-gray-200 shadow-md rounded-lg" 
          onSubmit={onSubmit}
        >
          {/* Student Selection */}
          <div className="mb-4">
            <label htmlFor="estudiante" className="block text-sm font-medium text-gray-700">
              Seleccionar Estudiante
            </label>
            <select
              id="estudiante"
              name="estudiante"
              className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Seleccione un estudiante</option>
              {estudiantes.map((est) => (
                <option key={est.id} value={est.id}>
                  {est.nombre} - {est.carrera}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label htmlFor="calificacion" className="block text-sm font-medium text-gray-700">
              Calificación (1-100)
            </label>
            <input 
              type="number" 
              id="calificacion" 
              name="calificacion"
              min="1"
              max="100"
              className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Comments */}
          <div className="mb-4">
            <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700">
              Comentarios
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              rows="4"
              className="mt-1 block w-full bg-gray-50 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Desempeño, habilidades, áreas de mejora..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Enviar Calificación
          </button>
        </form>
      )}
    </div>
  )
}