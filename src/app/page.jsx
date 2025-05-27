'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useUsuario } from "./context/UsuarioContext";

function Page() {
  const { usuario } = useUsuario();
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOfertas() {
      try {
        const res = await fetch('/api/oferta'); 
        if (!res.ok) throw new Error('Error al obtener las ofertas');
        const data = await res.json();
        setOfertas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOfertas();
  }, []);

  return (
    <div>
      <Navbar />
      {usuario ? (
        <>
          <h2 className="text-2xl mb-4">¡Bienvenido {usuario.name}!</h2>
          {loading && <p>Cargando ofertas...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && (
            <ul>
              {ofertas.length > 0 ? (
                ofertas.map((oferta) => (
                  <li key={oferta._id || oferta.id} className="mb-2">
                    <h3 className="font-bold">{oferta.titulo}</h3>
                    <p>{oferta.descripcion}</p>
                  </li>
                ))
              ) : (
                <p>No hay ofertas disponibles.</p>
              )}
            </ul>
          )}
        </>
      ) : (
        <h2>No has iniciado sesión.</h2>
      )}
    </div>
  );
}

export default Page;
