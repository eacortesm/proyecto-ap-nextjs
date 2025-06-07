'use client';

import { useState } from 'react';

function Offer({ offer, tipoUsuario, correo, handleDelete }) {
  const [interesado, setInteresado] = useState(offer.estudiantesInteresados?.some(
    (estudiante) => estudiante.correoEstudiante === correo
  ));

  const agregarInteresado = async () => {
    console.log(correo);
    const response = await fetch(`/api/oferta/${offer.titulo}/estudiante`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correoEstudiante: correo, aceptado: false, promedioPonderado: "0" }),
    });

    if (response.ok) {
      setInteresado(true);
    } else {
      console.error('Error al agregar estudiante interesado');
    }
  };

  const eliminarInteresado = async () => {
    const response = await fetch(`/api/oferta/${offer.titulo}/estudiante/${correo}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setInteresado(false);
    } else {
      console.error('Error al eliminar estudiante interesado');
    }
  }

  const handleClick = () => {
    if (tipoUsuario === 'ESTUDIANTE') {
      if (interesado) {
        eliminarInteresado();
      } else {
        agregarInteresado();
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-cyan-900 mb-2">{offer.titulo}</h3>
      <p className="text-gray-700 mb-4">{offer.descripcion}</p>
      <div className="text-sm text-gray-500 flex justify-between">
        <span>Inicio: <time>{offer.fechaInicio}</time></span>
        <span>Fin: <time>{offer.fechaFin}</time></span>
      </div>
      <div className="mt-4 flex gap-2">
        { tipoUsuario === 'ESTUDIANTE' ? (
          <div className="flex gap-2">
            <button className="material-symbols-outlined" onClick={handleClick}>
              {interesado ? 'remove' : 'add'}
            </button>
          </div>
            
        ) : (
          <div className="flex gap-2">
            <button className="material-symbols-outlined">edit</button>
            <button onClick={handleDelete} className="material-symbols-outlined">delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Offer;