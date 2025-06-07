'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useUsuario } from "../context/UsuarioContext";
import Offer from "@/components/Offer";

export default function OfertaPage() {
  const { usuario } = useUsuario();
  const searchParams = useSearchParams();
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const titulo = searchParams.get("titulo") || null;
    const departamento = searchParams.get("departamento") || null;
    const requisitos = searchParams.get("requisitos") || null;

    const fetchOfertas = async () => {
      try {
        const res = await fetch('/api/oferta/filtrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ titulo, departamento, requisitos }),
        });

        if (!res.ok) throw new Error('Error al obtener las ofertas');

        const data = await res.json();
        setOfertas(data.data);
      } catch (error) {
        console.error('Error fetching ofertas:', error);
        setError(error.message);
        setOfertas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOfertas();
  }, [searchParams]);

  return (
    <div>
      {usuario ? (
        <div>
          <Navbar tipoUsuario={usuario.tipoUsuario} />
          <main>
            <h2 className="text-2xl mb-4 text-center">¡Bienvenido {usuario.name}!</h2>
            {loading && <p>Cargando ofertas...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && (
              <ul className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ofertas.length > 0 ? (
                  ofertas.map((oferta) => (
                    <li key={oferta._id || oferta.id} className="mb-2">
                      <Offer offer={oferta} tipoUsuario={usuario.tipoUsuario} handleDelete={() => handleDelete(oferta.titulo)} />
                    </li>
                  ))
                ) : (
                  <p>No hay ofertas disponibles.</p>
                )}
              </ul>
            )}
          </main>
        </div>
      ) : (
        <div>
          <Navbar />
          <h2>No has iniciado sesión.</h2>
        </div>
      )}
    </div>
  );
}